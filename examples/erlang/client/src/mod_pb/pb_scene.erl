-module(pb_scene).

-include("common.hrl").

-compile(export_all).


%% 请求进入场景(飞)
pack(2010 ,{MapId}) ->
	Bin1 = ?E(u32, MapId),
	BinData = <<Bin1/binary>>,
	{ok, ?MSG(2010, BinData)};

%% 请求进入场景
pack(2020 ,{DoorId}) ->
	Bin1 = ?E(u32, DoorId),
	BinData = <<Bin1/binary>>,
	{ok, ?MSG(2020, BinData)};

%% 行走数据
pack(2030 ,{SceneRotPos,Forward,AniName,XAxis}) ->
	Bin1 = pb_struct:pack_msg_scene_rot_pos(SceneRotPos),
	Bin2 = pb_struct:pack_msg_scene_vector_3(Forward),
	Bin3 = ?E(string, AniName),
	Bin4 = ?E(i16, XAxis),
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary>>,
	{ok, ?MSG(2030, BinData)};

%% 进入场景成功
pack(2040 ,{Player}) ->
	Bin1 = pb_struct:pack_msg_scene_player(Player),
	BinData = <<Bin1/binary>>,
	{ok, ?MSG(2040, BinData)};

%% 场景玩家列表
pack(2050 ,{Players}) ->
	FunPlayers = fun(FPlayers, {CountAcc, BinAcc}) ->
			FBin = pb_struct:pack_msg_scene_player(FPlayers),
			{CountAcc + 1, <<BinAcc/binary,FBin/binary>>}
	end,
	{CountPlayers, BinPlayers} = lists:foldl(FunPlayers, {0, <<>>}, Players),
	Bin1 = ?E(u16, CountPlayers),
	Bin2 = BinPlayers,
	BinData = <<Bin1/binary,Bin2/binary>>,
	{ok, ?MSG(2050, BinData)};

%% 退出场景成功
pack(2060 ,{Uid}) ->
	Bin1 = ?E(u32, Uid),
	BinData = <<Bin1/binary>>,
	{ok, ?MSG(2060, BinData)};

%% 请求玩家列表
pack(2070 ,{}) ->
	BinData = <<>>,
	{ok, ?MSG(2070, BinData)};

%% 行走数据
pack(2080 ,{SceneRotPos,Forward,AniName,XAxis,Uid}) ->
	Bin1 = pb_struct:pack_msg_scene_rot_pos(SceneRotPos),
	Bin2 = pb_struct:pack_msg_scene_vector_3(Forward),
	Bin3 = ?E(string, AniName),
	Bin4 = ?E(i16, XAxis),
	Bin5 = ?E(u32, Uid),
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary,Bin5/binary>>,
	{ok, ?MSG(2080, BinData)};

pack(_Cmd, _Data) -> 
	{error, {unknown_command, _Data}}.


%% 请求进入场景(飞)
unpack(2010, _Bin0) ->
	{MapId, _Bin1} = ?D(u32, _Bin0),
	{ok, {MapId}};

%% 请求进入场景
unpack(2020, _Bin0) ->
	{DoorId, _Bin1} = ?D(u32, _Bin0),
	{ok, {DoorId}};

%% 行走数据
unpack(2030, _Bin0) ->
	{SceneRotPos, _Bin1} = pb_struct:unpack_msg_scene_rot_pos(_Bin0),
	{Forward, _Bin2} = pb_struct:unpack_msg_scene_vector_3(_Bin1),
	{AniName, _Bin3} = ?D(string, _Bin2),
	{XAxis, _Bin4} = ?D(i16, _Bin3),
	{ok, {SceneRotPos,Forward,AniName,XAxis}};

%% 进入场景成功
unpack(2040, _Bin0) ->
	{Player, _Bin1} = pb_struct:unpack_msg_scene_player(_Bin0),
	{ok, {Player}};

%% 场景玩家列表
unpack(2050, _Bin0) ->
	{PlayersCount, _Bin1} = ?D(u16, _Bin0),
	FunPlayers = fun(_, {PlayersAcc, _BinPlayersAcc}) ->
				{FunPlayers, _BinPlayersAcc2} = pb_struct:unpack_msg_scene_player(_BinPlayersAcc),
				{[FunPlayers|PlayersAcc], _BinPlayersAcc2}
			end,
	{PlayersTmp, _Bin2} = lists:foldl(FunPlayers, {[], _Bin1}, lists:duplicate(PlayersCount, 0)),
	Players = lists:reverse(PlayersTmp),
	{ok, {Players}};

%% 退出场景成功
unpack(2060, _Bin0) ->
	{Uid, _Bin1} = ?D(u32, _Bin0),
	{ok, {Uid}};

%% 请求玩家列表
unpack(2070, _Bin0) ->
	{ok, {}};

%% 行走数据
unpack(2080, _Bin0) ->
	{SceneRotPos, _Bin1} = pb_struct:unpack_msg_scene_rot_pos(_Bin0),
	{Forward, _Bin2} = pb_struct:unpack_msg_scene_vector_3(_Bin1),
	{AniName, _Bin3} = ?D(string, _Bin2),
	{XAxis, _Bin4} = ?D(i16, _Bin3),
	{Uid, _Bin5} = ?D(u32, _Bin4),
	{ok, {SceneRotPos,Forward,AniName,XAxis,Uid}};

unpack(_Cmd, _Bin) -> 
	{error, {unknown_command, _Bin}}.
