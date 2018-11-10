-module(pb_role).

-include("common.hrl").

-compile(export_all).


%% 角色登录
pack(1010 ,{Uid,Uuid,Sid,Cid,LoginTime,Pwd,Relink,Debug,Os,Version}) ->
	Bin1 = ?E(u32, Uid),
	Bin2 = ?E(u32, Uuid),
	Bin3 = ?E(u16, Sid),
	Bin4 = ?E(u16, Cid),
	Bin5 = ?E(u32, LoginTime),
	Bin6 = ?E(string, Pwd),
	Bin7 = ?E(u8, Relink),
	Bin8 = ?E(u8, Debug),
	Bin9 = ?E(string, Os),
	Bin10 = ?E(string, Version),
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary,Bin5/binary,Bin6/binary,Bin7/binary,Bin8/binary,Bin9/binary,Bin10/binary>>,
	{ok, ?MSG(1010, BinData)};

%% 角色创建
pack(1020 ,{Uid,Uuid,Sid,Cid,Os,Version,Uname,Source,SourceSub,LoginTime}) ->
	Bin1 = ?E(u32, Uid),
	Bin2 = ?E(u32, Uuid),
	Bin3 = ?E(u16, Sid),
	Bin4 = ?E(u16, Cid),
	Bin5 = ?E(string, Os),
	Bin6 = ?E(string, Version),
	Bin7 = ?E(string, Uname),
	Bin8 = ?E(string, Source),
	Bin9 = ?E(string, SourceSub),
	Bin10 = ?E(u32, LoginTime),
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary,Bin5/binary,Bin6/binary,Bin7/binary,Bin8/binary,Bin9/binary,Bin10/binary>>,
	{ok, ?MSG(1020, BinData)};

%% 请求随机名字
pack(1030 ,{}) ->
	BinData = <<>>,
	{ok, ?MSG(1030, BinData)};

%% 随机名字返回
pack(1040 ,{Uname}) ->
	Bin1 = ?E(string, Uname),
	BinData = <<Bin1/binary>>,
	{ok, ?MSG(1040, BinData)};

%% 登录成功
pack(1050 ,{Uname}) ->
	Bin1 = ?E(string, Uname),
	BinData = <<Bin1/binary>>,
	{ok, ?MSG(1050, BinData)};

%% 登录成功(无角色)
pack(1060 ,{}) ->
	BinData = <<>>,
	{ok, ?MSG(1060, BinData)};

pack(_Cmd, _Data) -> 
	{error, {unknown_command, _Data}}.


%% 角色登录
unpack(1010, _Bin0) ->
	{Uid, _Bin1} = ?D(u32, _Bin0),
	{Uuid, _Bin2} = ?D(u32, _Bin1),
	{Sid, _Bin3} = ?D(u16, _Bin2),
	{Cid, _Bin4} = ?D(u16, _Bin3),
	{LoginTime, _Bin5} = ?D(u32, _Bin4),
	{Pwd, _Bin6} = ?D(string, _Bin5),
	{Relink, _Bin7} = ?D(u8, _Bin6),
	{Debug, _Bin8} = ?D(u8, _Bin7),
	{Os, _Bin9} = ?D(string, _Bin8),
	{Version, _Bin10} = ?D(string, _Bin9),
	{ok, {Uid,Uuid,Sid,Cid,LoginTime,Pwd,Relink,Debug,Os,Version}};

%% 角色创建
unpack(1020, _Bin0) ->
	{Uid, _Bin1} = ?D(u32, _Bin0),
	{Uuid, _Bin2} = ?D(u32, _Bin1),
	{Sid, _Bin3} = ?D(u16, _Bin2),
	{Cid, _Bin4} = ?D(u16, _Bin3),
	{Os, _Bin5} = ?D(string, _Bin4),
	{Version, _Bin6} = ?D(string, _Bin5),
	{Uname, _Bin7} = ?D(string, _Bin6),
	{Source, _Bin8} = ?D(string, _Bin7),
	{SourceSub, _Bin9} = ?D(string, _Bin8),
	{LoginTime, _Bin10} = ?D(u32, _Bin9),
	{ok, {Uid,Uuid,Sid,Cid,Os,Version,Uname,Source,SourceSub,LoginTime}};

%% 请求随机名字
unpack(1030, _Bin0) ->
	{ok, {}};

%% 随机名字返回
unpack(1040, _Bin0) ->
	{Uname, _Bin1} = ?D(string, _Bin0),
	{ok, {Uname}};

%% 登录成功
unpack(1050, _Bin0) ->
	{Uname, _Bin1} = ?D(string, _Bin0),
	{ok, {Uname}};

%% 登录成功(无角色)
unpack(1060, _Bin0) ->
	{ok, {}};

unpack(_Cmd, _Bin) -> 
	{error, {unknown_command, _Bin}}.
