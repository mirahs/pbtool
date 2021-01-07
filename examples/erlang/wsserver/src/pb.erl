-module(pb).

-export([
    msg/2
    ,send/2
    ,send_fast/2

    ,encode/2
    ,decode/2
]).


%% 协议编码
msg(MsgId, BinData) ->
    LenBin	= byte_size(BinData),
    Len		= LenBin + 2,
    <<Len:16/big-integer-unsigned, MsgId:16/big-integer-unsigned, BinData/binary>>.

%% 发送消息
send(_Socket, <<>>) -> true;
send(Socket, BinMsg) ->
    case send_fast(Socket, BinMsg) of
        ok -> true;
        {error, _Reason} -> false
    end.

send_fast(Socket, BinMsg) ->
    try erlang:port_command(Socket, BinMsg, [force,nosuspend]) of
        true -> ok;
        false -> {error, busy}
    catch
        _:_Error -> {error, einval}
    end.


%% 数据编码
encode(i8, Val) ->
    <<Val:8/big-integer-signed>>;
encode(u8, Val) ->
    <<Val:8/big-integer-unsigned>>;
encode(i16, Val) ->
    <<Val:16/big-integer-signed>>;
encode(u16, Val) ->
    <<Val:16/big-integer-unsigned>>;
encode(i32, Val) ->
    <<Val:32/big-integer-signed>>;
encode(u32, Val) ->
    <<Val:32/big-integer-unsigned>>;
encode(i64, Val) ->
    <<Val:64/big-integer-signed>>;
encode(u64, Val) ->
    <<Val:64/big-integer-unsigned>>;
encode(f32, Val) ->
    <<Val:32/big-float>>;
encode(f64, Val) ->
    <<Val:64/big-float>>;
encode(string, Val) ->
    Len = byte_size(Val),
    <<Len:16/big-integer-unsigned, Val:Len/binary>>.

%% 数据解码
decode(i8, <<Val:8/big-integer-signed,Rest/binary>>) ->
    {Val,Rest};
decode(u8, <<Val:8/big-integer-unsigned,Rest/binary>>) ->
    {Val,Rest};
decode(i16, <<Val:16/big-integer-signed,Rest/binary>>) ->
    {Val,Rest};
decode(u16, <<Val:16/big-integer-unsigned,Rest/binary>>) ->
    {Val,Rest};
decode(i32, <<Val:32/big-integer-signed,Rest/binary>>) ->
    {Val,Rest};
decode(u32, <<Val:32/big-integer-unsigned,Rest/binary>>) ->
    {Val,Rest};
decode(i64, <<Val:64/big-integer-signed,Rest/binary>>) ->
    {Val,Rest};
decode(u64, <<Val:64/big-integer-unsigned,Rest/binary>>) ->
    {Val,Rest};
decode(f32, <<Val:32/big-float,Rest/binary>>) ->
    {Val,Rest};
decode(f64, <<Val:64/big-float,Rest/binary>>) ->
    {Val,Rest};
decode(string, <<Len:16/big-integer-unsigned, Val:Len/binary,Rest/binary>>) ->
    {Val,Rest}.
