%% -*- coding: latin-1 -*-
-module(server).

-include("common.hrl").

-compile(export_all).

-define(DEBUG(F), debug(F, [], ?MODULE, ?LINE)).
-define(DEBUG(F, A), debug(F, A, ?MODULE, ?LINE)).


start() ->
	{ok, ListenSocket} = gen_tcp:listen(?LISTEN_PORT, ?TCP_OPTIONS),
	accept(ListenSocket).

accept(ListenSocket) ->
	{ok, Socket} = gen_tcp:accept(ListenSocket),?DEBUG("客户端连接"),
	send(Socket, pack(?s_test_js_ok, {123456789, -123456789})),
	Pid = spawn(?MODULE, recv, [Socket]),
	gen_tcp:controlling_process(Socket, Pid),
	accept(ListenSocket).

recv(Socket) ->
	recv(Socket, <<>>).

recv(Socket, Bin) ->
	receive
		{tcp, Socket, BinRecv} ->
			Bin2 = work(Socket, <<Bin/binary,BinRecv/binary>>),
			recv(Socket, Bin2);
		{tcp_closed, Socket} ->?DEBUG("客户端断开"),
			gen_tcp:close(Socket);
		_ ->
			recv(Socket, Bin)
	end.


%% ----------------------------------------------------
%% 内部函数
%% ----------------------------------------------------

%% 解包
work(Socket, <<Len:16/big-integer-unsigned, BinData:Len/binary, BinAcc/binary>>) ->
	<<PacketId:16/big-integer-unsigned, BinData2/binary>> = BinData,
	%?DEBUG("收到消息PacketId:~w", [PacketId]),
	routing(PacketId, BinData2, Socket),
	work(Socket, BinAcc);
work(_Socket, BinAcc) ->
	BinAcc.

%% 路由处理
routing(PacketId, BinData, Socket) ->
	case module(PacketId) of
		{ok, Proto} ->?DEBUG("xxxxx PacketPd:~w, Proto:~p, BinData:~w", [PacketId, Proto, BinData]),
			case Proto:unpack(PacketId, BinData) of
				{ok, Data} ->?DEBUG("xxxxx"),
					rpc(PacketId, Data, Socket);
				{error, _} ->?DEBUG("xxxxx"),
					?DEBUG("unknown_command:~w", [PacketId])
			end;
		{error, _} ->?DEBUG("xxxxx"),
			?DEBUG("no routing module:~w", [PacketId])
	end.


%% rpc处理
rpc(?c_test_x_x, Data, Socket) ->?DEBUG("xxxxx"),
	?DEBUG("c_test_x_x Data:~p~n", [Data]),
    %send(pack(?s_test_x_x, Data)),
    {ok, Bin} = pack(?s_test_x_x, Data),
     send(Socket, <<Bin/binary, Bin/binary>>);
rpc(?c_test_send, Data, Socket) ->?DEBUG("xxxxx"),
	?DEBUG("c_test_send Data:~p~n", [Data]),
	{ok, Bin} = pack(?s_test_send_ok, Data),
    send(Socket, <<Bin/binary, Bin/binary>>);
rpc(?c_test_js, Data, Socket) ->?DEBUG("xxxxx"),
	?DEBUG("P_C_TEST_JS Data:~p~n", [Data]),
    send(Socket, pack(?s_test_js_ok, Data));
rpc(PacketId, Data, _Socket) ->?DEBUG("xxxxx"),
	?DEBUG("Unknow PacketId:~w Data:~w~n", [PacketId, Data]).

%% 发送消息给客户端
send(Socket, {ok, Bin}) ->
	pb_msg:send(Socket, Bin);
send(Socket, Bin) when is_binary(Bin) ->
	pb_msg:send(Socket, Bin);
send(_Socket, _Err) ->
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
