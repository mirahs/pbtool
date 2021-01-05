-module(pb_chat).

-include("common.hrl").

-compile(export_all).


%% 发送聊天信息
pack(2010 ,{Channel,Content,DestUid}) ->
	Bin1 = ?E(u8, Channel),
	Bin2 = ?E(string, Content),
	Bin3 = 
		case DestUid of
			undefined ->
				?E(u8, 0);
			_ ->
				BinDestUidFlag = ?E(u8, 1),
				BinDestUid= ?E(u32, DestUid),
				<<BinDestUidFlag/binary,BinDestUid/binary>>
		end,
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary>>,
	{ok, ?MSG(2010, BinData)};

%% 聊天信息返回
pack(2020 ,{Channel,Uid,Uname,Content}) ->
	Bin1 = ?E(u8, Channel),
	Bin2 = ?E(u32, Uid),
	Bin3 = ?E(string, Uname),
	Bin4 = ?E(string, Content),
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary>>,
	{ok, ?MSG(2020, BinData)};

%% GM命令
pack(2030 ,{Content}) ->
	Bin1 = ?E(string, Content),
	BinData = <<Bin1/binary>>,
	{ok, ?MSG(2030, BinData)};

pack(_Cmd, _Data) -> 
	{error, {unknown_command, _Data}}.


%% 发送聊天信息
msg(2010 ,{Channel,Content,DestUid}) ->
	Bin1 = ?E(u8, Channel),
	Bin2 = ?E(string, Content),
	Bin3 = 
		case DestUid of
			undefined ->
				?E(u8, 0);
			_ ->
				BinDestUidFlag = ?E(u8, 1),
				BinDestUid= ?E(u32, DestUid),
				<<BinDestUidFlag/binary,BinDestUid/binary>>
		end,
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary>>,
	{ok, BinData};

%% 聊天信息返回
msg(2020 ,{Channel,Uid,Uname,Content}) ->
	Bin1 = ?E(u8, Channel),
	Bin2 = ?E(u32, Uid),
	Bin3 = ?E(string, Uname),
	Bin4 = ?E(string, Content),
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary>>,
	{ok, BinData};

%% GM命令
msg(2030 ,{Content}) ->
	Bin1 = ?E(string, Content),
	BinData = <<Bin1/binary>>,
	{ok, BinData};

msg(_Cmd, _Data) -> 
	{error, {unknown_command, _Data}}.


%% 发送聊天信息
unpack(2010, _Bin0) ->
	{Channel, _Bin1} = ?D(u8, _Bin0),
	{Content, _Bin2} = ?D(string, _Bin1),
	{DestUidFlag, _Bin3} = ?D(u8, _Bin2),
	{DestUid, _Bin4} =
	case DestUidFlag of
		0 ->
			{undefined, _Bin3};
		1 ->
			?D(u32, _Bin3)
	end,
	{ok, {Channel,Content,DestUid}};

%% 聊天信息返回
unpack(2020, _Bin0) ->
	{Channel, _Bin1} = ?D(u8, _Bin0),
	{Uid, _Bin2} = ?D(u32, _Bin1),
	{Uname, _Bin3} = ?D(string, _Bin2),
	{Content, _Bin4} = ?D(string, _Bin3),
	{ok, {Channel,Uid,Uname,Content}};

%% GM命令
unpack(2030, _Bin0) ->
	{Content, _Bin1} = ?D(string, _Bin0),
	{ok, {Content}};

unpack(_Cmd, _Bin) -> 
	{error, {unknown_command, _Bin}}.
