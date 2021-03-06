%% -*- coding: latin-1 -*-
-module(ws_handler).

-export([init/2]).
-export([websocket_init/1]).
-export([websocket_handle/2]).
-export([websocket_info/2]).
-export([terminate/3]).

-export([
	now/0
]).

-include("common.hrl").
-include("pb.hrl").

-record(state, {ip, port, connect_time, last_hb = 0, recv_count = 0, send_count = 0, bin = <<>>}).

-define(heart_time, 30).


init(Req = #{peer := {IpTmp, Port}}, _Opts) ->
	?DEBUG("客户端链接成功..."),
	Ip = ip(IpTmp),
	{cowboy_websocket, Req, #state{ip = Ip, port = Port}}.

websocket_init(State) ->
	%erlang:send_after(timer:seconds(?heart_time), self(), check_heartbeat), %% 检查心跳
	{ok, State#state{connect_time = unixtime()}}.

websocket_handle({binary, Bin}, State = #state{recv_count = RecvCount, bin = BinAcc}) ->
	self() ! read_next,
	{ok, State#state{recv_count = RecvCount + 1, bin = <<BinAcc/binary, Bin/binary>>}};
websocket_handle(_Data, State) ->
	?DEBUG("_Data:~w", [_Data]),
	{ok, State}.

websocket_info(check_heartbeat, State = #state{last_hb = LastHb}) ->
	Now = unixtime(),
	Diff= Now - LastHb,
	case Diff > ?heart_time of
		true -> {stop, State};
		false ->
			erlang:send_after(timer:seconds(?heart_time), self(), check_heartbeat), %% 检查心跳
			{ok, State}
	end;
websocket_info(read_next, State = #state{bin = Bin}) ->
	work(Bin, State);
websocket_info({send_data, Bin}, State = #state{send_count = SendCount}) ->
	{reply, {binary, Bin}, State#state{send_count = SendCount + 1}};
websocket_info(_Info, State) ->
	?DEBUG("_Info:~w", [_Info]),
	{ok, State}.

terminate(Reason, PartialReq, State) ->
	?DEBUG("客户端链接中断Reason:~w, PartialReq:~p, State:~p", [Reason, PartialReq, State]),
	ok.


%%%===================================================================
%%% 路由处理
%%%===================================================================

%% 解包
work(<<Len:16/big-integer-unsigned, BinData:Len/binary, Bin/binary>>, State) ->
	<<PacketId:16/big-integer-unsigned, BinData2/binary>> = BinData,
	routing(PacketId, BinData2),
	self() ! read_next,
	{ok, State#state{bin = Bin}};
work(_Bin, State) ->
	{ok, State}.

%% 路由处理
routing(PacketId, BinData) ->
    case module(PacketId) of
        {ok, Proto} ->
            ?DEBUG("routing PacketId:~w, Proto:~p, BinData:~w", [PacketId, Proto, BinData]),
            case Proto:unpack(PacketId, BinData) of
                {ok, Data} -> rpc(PacketId, Data);
                {error, _Error} -> ?DEBUG("PacketId:~w unpack 错误:~p", [PacketId, _Error])
            end;
        {error, _Error} -> ?DEBUG("PacketId:~w 路由 错误:~p", [PacketId, _Error])
    end.


%% rpc处理
rpc(?p_role_login, Data) ->
    ?DEBUG("p_role_login Data:~p~n", [Data]),
    {ok, Bin1} = pack(?p_role_login_ok, {10086, <<"erlang">>, [{100, 11}, {200, 22}]}),
    {ok, Bin2} = pack(?p_goods_item, {300, 33}),
    send([Bin1, Bin2]);
rpc(PacketId, Data) ->
    ?DEBUG("Unknow PacketId:~w Data:~w~n", [PacketId, Data]).


%%%===================================================================
%%% Internal functions
%%%===================================================================

module(Cmd) -> code(Cmd div 1000).

%% 协议映射
code(1) -> {ok, pb_role};
code(2) -> {ok, pb_goods};

%% 未知编号
code(Code) -> {error, Code}.

pack(Cmd, Data) ->
    case module(Cmd) of
        {ok, Proto} ->
            case catch Proto:pack(Cmd, Data) of
                {ok, Bin} -> {ok, Bin};
                _Err ->
                    ?DEBUG("打包数据出错[Cmd:~w][Data:~w][Reason:~w]", [Cmd, Data, _Err]),
                    {error, "打包数据时发生异常"}
            end;
        {error, _Code} ->
            ?DEBUG("模块影射失败[~w]:~w", [Cmd, Data]),
            {error, "打包数据时发生异常"}
    end.

%% 发送消息
send({ok, Bin}) ->
    self() ! {send_data, Bin};
send(Bin) ->
    self() ! {send_data, Bin}.


ip({IP1, IP2, IP3, IP4}) ->
	list_to_bitstring(lists:concat([IP1, ".", IP2, ".", IP3, ".", IP4])).

now() ->
	os:timestamp().

unixtime() ->
	{M, S, _Ms} = ?MODULE:now(),
	M * 1000000 + S.
