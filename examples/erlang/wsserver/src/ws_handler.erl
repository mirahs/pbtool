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

-define(DEBUG(F), debug(F, [], ?MODULE, ?LINE)).
-define(DEBUG(F, A), debug(F, A, ?MODULE, ?LINE)).

-define(heart_time, 30).

-record(state, {ip, port, connect_time, last_hb = 0, recv_count = 0, send_count = 0, bin = <<>>}).


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


%% ----------------------------------------------------
%% 内部函数
%% ----------------------------------------------------

%% 解包
work(<<Len:16/big-integer-unsigned, BinData:Len/binary, Bin/binary>>, State) ->
	<<PacketId:16/big-integer-unsigned, BinData2/binary>> = BinData,
	?DEBUG("收到消息PacketId:~w", [PacketId]),
	State2 = routing(PacketId, BinData2, State#state{bin = Bin}),
	self() ! read_next,
	{ok, State2};
work(_Bin, State) ->
	{ok, State}.

%% 路由处理
routing(PacketId, BinData, State) ->
	case module(PacketId) of
		{ok, Proto} ->?DEBUG("xxxxx PacketPd:~w, Proto:~p, BinData:~w", [PacketId, Proto, BinData]),
			case Proto:unpack(PacketId, BinData) of
				{ok, Data} ->?DEBUG("xxxxx"),
					rpc(PacketId, Data, State);
				{error, _} ->?DEBUG("xxxxx"),
					?DEBUG("unknown_command:~w", [PacketId]),
					State
			end;
		{error, _} ->?DEBUG("xxxxx"),
			?DEBUG("no routing module:~w", [PacketId]),
			State
	end.


%% rpc处理
rpc(?c_test_x_x, Data, State) ->?DEBUG("xxxxx"),
	?DEBUG("c_test_x_x Data:~p~n", [Data]),
    %send(pack(?s_test_x_x, Data)),
    {ok, Bin} = pack(?s_test_x_x, Data),
     send(<<Bin/binary, Bin/binary>>),
    State;
rpc(?c_test_send, Data, State) ->?DEBUG("xxxxx"),
	?DEBUG("c_test_send Data:~p~n", [Data]),
	{ok, Bin} = pack(?s_test_send_ok, Data),
    send(<<Bin/binary, Bin/binary>>),
    State;
rpc(?c_test_js, Data, State) ->?DEBUG("xxxxx"),
	?DEBUG("P_C_TEST_JS Data:~p~n", [Data]),
    send(pack(?s_test_js_ok, Data)),
    State;
rpc(PacketId, Data, State) ->?DEBUG("xxxxx"),
	?DEBUG("Unknow PacketId:~w Data:~w~n", [PacketId, Data]),
	State.

%% 发送消息给客户端
send({ok, Bin}) ->
	self() ! {send_data, Bin};
send(Bin) when is_binary(Bin) ->
	self() ! {send_data, Bin};
send(_Err) ->
	?DEBUG("_Err:~p~n", [_Err]).


%% ----------------------------------------------------
%% 工具函数
%% ----------------------------------------------------

module(Cmd) -> code(Cmd div 100).

%% 游戏服务器协议映射
code(10) -> {ok, pb_role};
code(15) -> {ok, pb_chat};
code(20) -> {ok, pb_scene};
code(400) -> {ok, pb_test};

%% 未知编号
code(Code) -> {error, Code}.

pack(Cmd, Data) ->
    case module(Cmd) of
        {ok, Proto} ->
            case catch Proto:pack(Cmd, Data) of
                {ok, Bin} -> {ok, Bin};
                _Err -> 
                    %?DEBUG("打包数据出错[Cmd:~w][Data:~w][Reason:~w]", [Cmd, Data, _Err]),
                    {error, "打包数据时发生异常"}
            end;
        {error, _Code} ->
            %?DEBUG("模块影射失败[~w]:~w", [Cmd, Data]),
            {error, "打包数据时发生异常"}
    end.


ip({IP1,IP2,IP3,IP4}) ->
	list_to_bitstring(lists:concat([IP1,".",IP2,".",IP3,".",IP4])).

now() ->
	os:timestamp().

unixtime() ->
	{M, S, _Ms} = ?MODULE:now(),
	M * 1000000 + S.

debug(Format, Args, Mod, Line) ->
    Msg = format("debug", Format, Args, Mod, Line),
    io:format("~ts", [Msg]).

%% 格式化日志信息
format(T, F, A, Mod, Line) ->
    {{Y, M, D}, {H, I, S}} = erlang:localtime(),
    Date = lists:concat([Y, "/", M, "/", D, "_", H, ":", I, ":", S]),
    case Line of
        null -> erlang:iolist_to_binary(io_lib:format(lists:concat(["## ", T, " ~s ", F, "~n"]), [Date] ++ A));
        _ -> erlang:iolist_to_binary(io_lib:format(lists:concat(["## ", T, " ~s [~w:~w] ", F, "~n"]), [Date, Mod, Line] ++ A))
    end.
