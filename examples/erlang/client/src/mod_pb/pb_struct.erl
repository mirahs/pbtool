-module(pb_struct).

-include("common.hrl").

-compile(export_all).


%% 玩家基础信息
pack_msg_role_base({Uid,Uname}) ->
	Bin1 = ?E(u32, Uid),
	Bin2 = ?E(string, Uname),
	<<Bin1/binary,Bin2/binary>>.

%% 添加好友基础信息
pack_msg_friend_base_add({Uid,Uname}) ->
	Bin1 = ?E(u32, Uid),
	Bin2 = ?E(string, Uname),
	<<Bin1/binary,Bin2/binary>>.

%% 场景玩家旋转和位置信息
pack_msg_scene_rot_pos({RotX,RotY,RotZ,PosX,PosY,PosZ}) ->
	Bin1 = ?E(i16, RotX),
	Bin2 = ?E(i16, RotY),
	Bin3 = ?E(i16, RotZ),
	Bin4 = ?E(i16, PosX),
	Bin5 = ?E(i16, PosY),
	Bin6 = ?E(i16, PosZ),
	<<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary,Bin5/binary,Bin6/binary>>.

%% 场景玩家旋转和位置信息
pack_msg_scene_player({Uid,SceneRotPos}) ->
	Bin1 = ?E(u32, Uid),
	Bin2 = pb_struct:pack_msg_scene_rot_pos(SceneRotPos),
	<<Bin1/binary,Bin2/binary>>.

%% 场景Vector3信息
pack_msg_scene_vector_3({X,Y,Z}) ->
	Bin1 = ?E(i16, X),
	Bin2 = ?E(i16, Y),
	Bin3 = ?E(i16, Z),
	<<Bin1/binary,Bin2/binary,Bin3/binary>>.

%% 
pack_msg_test_x_x({IdU8,IdF32,IdOpU8}) ->
	Bin1 = ?E(u8, IdU8),
	FunIdF32 = fun(FIdF32, {CountAcc, BinAcc}) ->
			FBin = ?E(f32, FIdF32),
			{CountAcc + 1, <<BinAcc/binary,FBin/binary>>}
	end,
	{CountIdF32, BinIdF32} = lists:foldl(FunIdF32, {0, <<>>}, IdF32),
	Bin2 = ?E(u16, CountIdF32),
	Bin3 = BinIdF32,
	Bin4 = 
		case IdOpU8 of
			undefined ->
				?E(u8, 0);
			_ ->
				BinIdOpU8Flag = ?E(u8, 1),
				BinIdOpU8= ?E(u8, IdOpU8),
				<<BinIdOpU8Flag/binary,BinIdOpU8/binary>>
		end,
	<<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary>>.

%% 测试信息块
pack_msg_test_send({IdU8,RoleBase,IdF32,IdOpU8,OpRoleBase}) ->
	Bin1 = ?E(u8, IdU8),
	Bin2 = pb_struct:pack_msg_role_base(RoleBase),
	FunIdF32 = fun(FIdF32, {CountAcc, BinAcc}) ->
			FBin = ?E(f32, FIdF32),
			{CountAcc + 1, <<BinAcc/binary,FBin/binary>>}
	end,
	{CountIdF32, BinIdF32} = lists:foldl(FunIdF32, {0, <<>>}, IdF32),
	Bin3 = ?E(u16, CountIdF32),
	Bin4 = BinIdF32,
	Bin5 = 
		case IdOpU8 of
			undefined ->
				?E(u8, 0);
			_ ->
				BinIdOpU8Flag = ?E(u8, 1),
				BinIdOpU8= ?E(u8, IdOpU8),
				<<BinIdOpU8Flag/binary,BinIdOpU8/binary>>
		end,
	Bin6 = 
		case OpRoleBase of
			undefined ->
				?E(u8, 0);
			_ ->
				BinOpRoleBaseFlag = ?E(u8, 1),
				BinOpRoleBase = pb_struct:pack_msg_role_base(OpRoleBase),
				<<BinOpRoleBaseFlag/binary,BinOpRoleBase/binary>>
		end,
	<<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary,Bin5/binary,Bin6/binary>>.

%% 
pack_msg_test_php({U16}) ->
	Bin1 = ?E(u16, U16),
	<<Bin1/binary>>.

%% 玩家基础信息
unpack_msg_role_base(_Bin0) ->
	{Uid, _Bin1} = ?D(u32, _Bin0),
	{Uname, _Bin2} = ?D(string, _Bin1),
	{{Uid,Uname}, _Bin2}.

%% 添加好友基础信息
unpack_msg_friend_base_add(_Bin0) ->
	{Uid, _Bin1} = ?D(u32, _Bin0),
	{Uname, _Bin2} = ?D(string, _Bin1),
	{{Uid,Uname}, _Bin2}.

%% 场景玩家旋转和位置信息
unpack_msg_scene_rot_pos(_Bin0) ->
	{RotX, _Bin1} = ?D(i16, _Bin0),
	{RotY, _Bin2} = ?D(i16, _Bin1),
	{RotZ, _Bin3} = ?D(i16, _Bin2),
	{PosX, _Bin4} = ?D(i16, _Bin3),
	{PosY, _Bin5} = ?D(i16, _Bin4),
	{PosZ, _Bin6} = ?D(i16, _Bin5),
	{{RotX,RotY,RotZ,PosX,PosY,PosZ}, _Bin6}.

%% 场景玩家旋转和位置信息
unpack_msg_scene_player(_Bin0) ->
	{Uid, _Bin1} = ?D(u32, _Bin0),
	{SceneRotPos, _Bin2} = pb_struct:unpack_msg_scene_rot_pos(_Bin1),
	{{Uid,SceneRotPos}, _Bin2}.

%% 场景Vector3信息
unpack_msg_scene_vector_3(_Bin0) ->
	{X, _Bin1} = ?D(i16, _Bin0),
	{Y, _Bin2} = ?D(i16, _Bin1),
	{Z, _Bin3} = ?D(i16, _Bin2),
	{{X,Y,Z}, _Bin3}.

%% 
unpack_msg_test_x_x(_Bin0) ->
	{IdU8, _Bin1} = ?D(u8, _Bin0),
	{IdF32Count, _Bin2} = ?D(u16, _Bin1),
	FunIdF32 = fun(_, {IdF32Acc, _BinIdF32Acc}) ->
				{FunIdF32, _BinIdF32Acc2} = ?D(f32, _BinIdF32Acc),
				{[FunIdF32|IdF32Acc], _BinIdF32Acc2}
			end,
	{IdF32Tmp, _Bin3} = lists:foldl(FunIdF32, {[], _Bin2}, lists:duplicate(IdF32Count, 0)),
	IdF32 = lists:reverse(IdF32Tmp),
	{IdOpU8Flag, _Bin4} = ?D(u8, _Bin3),
	{IdOpU8, _Bin5} =
	case IdOpU8Flag of
		0 ->
			{undefined, _Bin4};
		1 ->
			?D(u8, _Bin4)
	end,
	{{IdU8,IdF32,IdOpU8}, _Bin5}.

%% 测试信息块
unpack_msg_test_send(_Bin0) ->
	{IdU8, _Bin1} = ?D(u8, _Bin0),
	{RoleBase, _Bin2} = pb_struct:unpack_msg_role_base(_Bin1),
	{IdF32Count, _Bin3} = ?D(u16, _Bin2),
	FunIdF32 = fun(_, {IdF32Acc, _BinIdF32Acc}) ->
				{FunIdF32, _BinIdF32Acc2} = ?D(f32, _BinIdF32Acc),
				{[FunIdF32|IdF32Acc], _BinIdF32Acc2}
			end,
	{IdF32Tmp, _Bin4} = lists:foldl(FunIdF32, {[], _Bin3}, lists:duplicate(IdF32Count, 0)),
	IdF32 = lists:reverse(IdF32Tmp),
	{IdOpU8Flag, _Bin5} = ?D(u8, _Bin4),
	{IdOpU8, _Bin6} =
	case IdOpU8Flag of
		0 ->
			{undefined, _Bin5};
		1 ->
			?D(u8, _Bin5)
	end,
	{OpRoleBaseFlag, _Bin7} = ?D(u8, _Bin6),
	{OpRoleBase, _Bin8} =
	case OpRoleBaseFlag of
		0 ->
			{undefined, _Bin7};
		1 ->
			pb_struct:unpack_msg_role_base(_Bin7)
	end,
	{{IdU8,RoleBase,IdF32,IdOpU8,OpRoleBase}, _Bin8}.

%% 
unpack_msg_test_php(_Bin0) ->
	{U16, _Bin1} = ?D(u16, _Bin0),
	{{U16}, _Bin1}.
