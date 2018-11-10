-module(pb_chat).

-include("common.hrl").

-compile(export_all).


%% 发送聊天信息
pack(1510 ,{Channel,DestUid,Content}) ->
	Bin1 = ?E(u8, Channel),
	Bin2 = ?E(u32, DestUid),
	Bin3 = ?E(string, Content),
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary>>,
	{ok, ?MSG(1510, BinData)};

%% 聊天信息返回
pack(1520 ,{Channel,Uid,Uname,Content}) ->
	Bin1 = ?E(u8, Channel),
	Bin2 = ?E(u32, Uid),
	Bin3 = ?E(string, Uname),
	Bin4 = ?E(string, Content),
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary>>,
	{ok, ?MSG(1520, BinData)};

%% GM命令
pack(1530 ,{Content}) ->
	Bin1 = ?E(string, Content),
	BinData = <<Bin1/binary>>,
	{ok, ?MSG(1530, BinData)};

pack(_Cmd, _Data) -> 
	{error, {unknown_command, _Data}}.


%% 发送聊天信息
unpack(1510, _Bin0) ->
	{Channel, _Bin1} = ?D(u8, _Bin0),
	{DestUid, _Bin2} = ?D(u32, _Bin1),
	{Content, _Bin3} = ?D(string, _Bin2),
	{ok, {Channel,DestUid,Content}};

%% 聊天信息返回
unpack(1520, _Bin0) ->
	{Channel, _Bin1} = ?D(u8, _Bin0),
	{Uid, _Bin2} = ?D(u32, _Bin1),
	{Uname, _Bin3} = ?D(string, _Bin2),
	{Content, _Bin4} = ?D(string, _Bin3),
	{ok, {Channel,Uid,Uname,Content}};

%% GM命令
unpack(1530, _Bin0) ->
	{Content, _Bin1} = ?D(string, _Bin0),
	{ok, {Content}};

unpack(_Cmd, _Bin) -> 
	{error, {unknown_command, _Bin}}.
