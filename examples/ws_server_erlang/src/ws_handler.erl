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
	erlang:send_after(timer:seconds(?heart_time), self(), check_heartbeat), %% 检查心跳
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
work(<<Len:16/big-integer-unsigned, PacketId:16/big-integer-unsigned, BinData:Len/binary, Bin/binary>>, State) ->
	?DEBUG("收到消息PacketId:~w", [PacketId]),
	State2 = routing(PacketId, BinData, State#state{bin = Bin}),
	self() ! read_next,
	{ok, State2};
work(_Bin, State) ->
	{ok, State}.

%% 路由处理
routing(?P_C_TEST_X_X, Bin, State) ->
	?DEBUG("Bin:~w~n", [Bin]),
    ReqTestXX 	= pb:req_test_x_x(Bin),
    ?DEBUG("ReqTestXX:~w~n", [ReqTestXX]),

    AckTestXX   = #ack_test_x_x{id_u8=100,id_u16=10000,id_u32=100000,repeat_id_u8=[255,255],optional_id_u8=222},
    BinMsg      = pb:ack_test_x_x(AckTestXX),
    send(BinMsg),
    State;
routing(?P_C_TEST_SEND, Bin, State) ->
	?DEBUG("Bin:~w~n", [Bin]),
    ReqTestSend = pb:req_test_send(Bin),
    ?DEBUG("ReqTestSend:~p~n", [ReqTestSend]),

    AckTestSend = #ack_test_send_ok{
        id_u8 = ReqTestSend#req_test_send.id_u8,
        id_f32 = ReqTestSend#req_test_send.id_f32,
        id_op_u8 = ReqTestSend#req_test_send.id_op_u8,
        role_base = ReqTestSend#req_test_send.role_base,
        op_role_base = ReqTestSend#req_test_send.op_role_base
    },
    BinMsg      = pb:ack_test_send_ok(AckTestSend),
    send(BinMsg),
    State;
routing(?P_C_TEST_JS, Bin, State) ->
	?DEBUG("Bin:~w~n", [Bin]),
    ReqTestJs = pb:req_test_js(Bin),
    ?DEBUG("ReqTestJs:~p~n", [ReqTestJs]),

    AckTestJsOk = #ack_test_js_ok{
        u64 = ReqTestJs#req_test_js.u64,
        i64 = ReqTestJs#req_test_js.i64
    },
    BinMsg = pb:ack_test_js_ok(AckTestJsOk),
    send(BinMsg),
    State;
routing(PacketId, Bin, State) ->
	?DEBUG("Unknow PacketId:~w Bin:~w~n", [PacketId, Bin]),
	State.

%% 发送消息给客户端
send(Bin) ->
	self() ! {send_data, Bin}.


%% ----------------------------------------------------
%% 工具函数
%% ----------------------------------------------------

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
