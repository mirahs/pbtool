-module(pb_chat).

-export([pack/2,pack_msg/2,unpack/2,unpack_msg/2]).


%% 发送聊天信息
pack(2010 ,{Channel,Content,DestUid}) ->
	Bin1 = pb:encode(u8, Channel),
	Bin2 = pb:encode(string, Content),
	Bin3 = 
		case DestUid of
			undefined ->
				pb:encode(u8, 0);
			_ ->
				BinDestUidFlag = pb:encode(u8, 1),
				BinDestUid= pb:encode(u32, DestUid),
				<<BinDestUidFlag/binary,BinDestUid/binary>>
		end,
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary>>,
	{ok, pb:msg(2010, BinData)};

%% 聊天信息返回
pack(2020 ,{Channel,Uid,Uname,Content}) ->
	Bin1 = pb:encode(u8, Channel),
	Bin2 = pb:encode(u32, Uid),
	Bin3 = pb:encode(string, Uname),
	Bin4 = pb:encode(string, Content),
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary>>,
	{ok, pb:msg(2020, BinData)};

%% GM命令
pack(2030 ,{Content}) ->
	Bin1 = pb:encode(string, Content),
	BinData = <<Bin1/binary>>,
	{ok, pb:msg(2030, BinData)};

pack(_Cmd, _Data) -> 
	{error, {unknown_command, _Data}}.


%% 发送聊天信息
pack_msg(2010 ,{Channel,Content,DestUid}) ->
	Bin1 = pb:encode(u8, Channel),
	Bin2 = pb:encode(string, Content),
	Bin3 = 
		case DestUid of
			undefined ->
				pb:encode(u8, 0);
			_ ->
				BinDestUidFlag = pb:encode(u8, 1),
				BinDestUid= pb:encode(u32, DestUid),
				<<BinDestUidFlag/binary,BinDestUid/binary>>
		end,
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary>>,
	{ok, BinData};

%% 聊天信息返回
pack_msg(2020 ,{Channel,Uid,Uname,Content}) ->
	Bin1 = pb:encode(u8, Channel),
	Bin2 = pb:encode(u32, Uid),
	Bin3 = pb:encode(string, Uname),
	Bin4 = pb:encode(string, Content),
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary>>,
	{ok, BinData};

%% GM命令
pack_msg(2030 ,{Content}) ->
	Bin1 = pb:encode(string, Content),
	BinData = <<Bin1/binary>>,
	{ok, BinData};

pack_msg(_Cmd, _Data) -> 
	{error, {unknown_command, _Data}}.


%% 发送聊天信息
unpack(2010, _Bin0) ->
	{Channel, _Bin1} = pb:decode(u8, _Bin0),
	{Content, _Bin2} = pb:decode(string, _Bin1),
	{DestUidFlag, _Bin3} = pb:decode(u8, _Bin2),
	{DestUid, _Bin4} =
	case DestUidFlag of
		0 ->
			{undefined, _Bin3};
		1 ->
			pb:decode(u32, _Bin3)
	end,
	{ok, {Channel,Content,DestUid}};

%% 聊天信息返回
unpack(2020, _Bin0) ->
	{Channel, _Bin1} = pb:decode(u8, _Bin0),
	{Uid, _Bin2} = pb:decode(u32, _Bin1),
	{Uname, _Bin3} = pb:decode(string, _Bin2),
	{Content, _Bin4} = pb:decode(string, _Bin3),
	{ok, {Channel,Uid,Uname,Content}};

%% GM命令
unpack(2030, _Bin0) ->
	{Content, _Bin1} = pb:decode(string, _Bin0),
	{ok, {Content}};

unpack(_Cmd, _Bin) -> 
	{error, {unknown_command, _Bin}}.

%% 发送聊天信息
unpack_msg(2010, _Bin0) ->
	{Channel, _Bin1} = pb:decode(u8, _Bin0),
	{Content, _Bin2} = pb:decode(string, _Bin1),
	{DestUidFlag, _Bin3} = pb:decode(u8, _Bin2),
	{DestUid, _Bin4} =
	case DestUidFlag of
		0 ->
			{undefined, _Bin3};
		1 ->
			pb:decode(u32, _Bin3)
	end,
	{{Channel,Content,DestUid},_Bin4};

%% 聊天信息返回
unpack_msg(2020, _Bin0) ->
	{Channel, _Bin1} = pb:decode(u8, _Bin0),
	{Uid, _Bin2} = pb:decode(u32, _Bin1),
	{Uname, _Bin3} = pb:decode(string, _Bin2),
	{Content, _Bin4} = pb:decode(string, _Bin3),
	{{Channel,Uid,Uname,Content},_Bin4};

%% GM命令
unpack_msg(2030, _Bin0) ->
	{Content, _Bin1} = pb:decode(string, _Bin0),
	{{Content},_Bin1};

unpack_msg(_Cmd, _Bin) -> 
	{error, {unknown_command, _Bin}}.
