-module(pb_test).

-include("common.hrl").

-compile(export_all).


%% 测试发送
pack(40010 ,{IdU8,RoleBase,IdF32,IdOpU8,OpRoleBase}) ->
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
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary,Bin5/binary,Bin6/binary>>,
	{ok, ?MSG(40010, BinData)};

%% 测试返回
pack(40020 ,{IdU8,RoleBase,IdF32,IdOpU8,OpRoleBase}) ->
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
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary,Bin5/binary,Bin6/binary>>,
	{ok, ?MSG(40020, BinData)};

%% 
pack(40040 ,{IdU8,IdU16,IdU32,RepeatIdU8,OptionalIdU8}) ->
	Bin1 = ?E(u8, IdU8),
	Bin2 = ?E(u16, IdU16),
	Bin3 = ?E(u32, IdU32),
	FunRepeatIdU8 = fun(FRepeatIdU8, {CountAcc, BinAcc}) ->
			FBin = ?E(u8, FRepeatIdU8),
			{CountAcc + 1, <<BinAcc/binary,FBin/binary>>}
	end,
	{CountRepeatIdU8, BinRepeatIdU8} = lists:foldl(FunRepeatIdU8, {0, <<>>}, RepeatIdU8),
	Bin4 = ?E(u16, CountRepeatIdU8),
	Bin5 = BinRepeatIdU8,
	Bin6 = 
		case OptionalIdU8 of
			undefined ->
				?E(u8, 0);
			_ ->
				BinOptionalIdU8Flag = ?E(u8, 1),
				BinOptionalIdU8= ?E(u8, OptionalIdU8),
				<<BinOptionalIdU8Flag/binary,BinOptionalIdU8/binary>>
		end,
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary,Bin5/binary,Bin6/binary>>,
	{ok, ?MSG(40040, BinData)};

%% 
pack(40050 ,{IdU8,IdU16,IdU32,RepeatIdU8,OptionalIdU8}) ->
	Bin1 = ?E(u8, IdU8),
	Bin2 = ?E(u16, IdU16),
	Bin3 = ?E(u32, IdU32),
	FunRepeatIdU8 = fun(FRepeatIdU8, {CountAcc, BinAcc}) ->
			FBin = ?E(u8, FRepeatIdU8),
			{CountAcc + 1, <<BinAcc/binary,FBin/binary>>}
	end,
	{CountRepeatIdU8, BinRepeatIdU8} = lists:foldl(FunRepeatIdU8, {0, <<>>}, RepeatIdU8),
	Bin4 = ?E(u16, CountRepeatIdU8),
	Bin5 = BinRepeatIdU8,
	Bin6 = 
		case OptionalIdU8 of
			undefined ->
				?E(u8, 0);
			_ ->
				BinOptionalIdU8Flag = ?E(u8, 1),
				BinOptionalIdU8= ?E(u8, OptionalIdU8),
				<<BinOptionalIdU8Flag/binary,BinOptionalIdU8/binary>>
		end,
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary,Bin5/binary,Bin6/binary>>,
	{ok, ?MSG(40050, BinData)};

%% 
pack(40060 ,{U64,Strxx,MsgReq,MsgOpt,MsgRep}) ->
	Bin1 = ?E(u64, U64),
	Bin2 = ?E(string, Strxx),
	Bin3 = pb_struct:pack_msg_test_php(MsgReq),
	Bin4 = 
		case MsgOpt of
			undefined ->
				?E(u8, 0);
			_ ->
				BinMsgOptFlag = ?E(u8, 1),
				BinMsgOpt = pb_struct:pack_msg_test_php(MsgOpt),
				<<BinMsgOptFlag/binary,BinMsgOpt/binary>>
		end,
	FunMsgRep = fun(FMsgRep, {CountAcc, BinAcc}) ->
			FBin = pb_struct:pack_msg_test_php(FMsgRep),
			{CountAcc + 1, <<BinAcc/binary,FBin/binary>>}
	end,
	{CountMsgRep, BinMsgRep} = lists:foldl(FunMsgRep, {0, <<>>}, MsgRep),
	Bin5 = ?E(u16, CountMsgRep),
	Bin6 = BinMsgRep,
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary,Bin5/binary,Bin6/binary>>,
	{ok, ?MSG(40060, BinData)};

%% 
pack(40070 ,{U64,Strxx,MsgReq,MsgOpt,MsgRep}) ->
	Bin1 = ?E(u64, U64),
	Bin2 = ?E(string, Strxx),
	Bin3 = pb_struct:pack_msg_test_php(MsgReq),
	Bin4 = 
		case MsgOpt of
			undefined ->
				?E(u8, 0);
			_ ->
				BinMsgOptFlag = ?E(u8, 1),
				BinMsgOpt = pb_struct:pack_msg_test_php(MsgOpt),
				<<BinMsgOptFlag/binary,BinMsgOpt/binary>>
		end,
	FunMsgRep = fun(FMsgRep, {CountAcc, BinAcc}) ->
			FBin = pb_struct:pack_msg_test_php(FMsgRep),
			{CountAcc + 1, <<BinAcc/binary,FBin/binary>>}
	end,
	{CountMsgRep, BinMsgRep} = lists:foldl(FunMsgRep, {0, <<>>}, MsgRep),
	Bin5 = ?E(u16, CountMsgRep),
	Bin6 = BinMsgRep,
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary,Bin5/binary,Bin6/binary>>,
	{ok, ?MSG(40070, BinData)};

%% 
pack(40080 ,{U64,I64}) ->
	Bin1 = ?E(u64, U64),
	Bin2 = ?E(i64, I64),
	BinData = <<Bin1/binary,Bin2/binary>>,
	{ok, ?MSG(40080, BinData)};

%% 
pack(40090 ,{U64,I64}) ->
	Bin1 = ?E(u64, U64),
	Bin2 = ?E(i64, I64),
	BinData = <<Bin1/binary,Bin2/binary>>,
	{ok, ?MSG(40090, BinData)};

pack(_Cmd, _Data) -> 
	{error, {unknown_command, _Data}}.


%% 测试发送
unpack(40010, _Bin0) ->
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
	{ok, {IdU8,RoleBase,IdF32,IdOpU8,OpRoleBase}};

%% 测试返回
unpack(40020, _Bin0) ->
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
	{ok, {IdU8,RoleBase,IdF32,IdOpU8,OpRoleBase}};

%% 
unpack(40040, _Bin0) ->
	{IdU8, _Bin1} = ?D(u8, _Bin0),
	{IdU16, _Bin2} = ?D(u16, _Bin1),
	{IdU32, _Bin3} = ?D(u32, _Bin2),
	{RepeatIdU8Count, _Bin4} = ?D(u16, _Bin3),
	FunRepeatIdU8 = fun(_, {RepeatIdU8Acc, _BinRepeatIdU8Acc}) ->
				{FunRepeatIdU8, _BinRepeatIdU8Acc2} = ?D(u8, _BinRepeatIdU8Acc),
				{[FunRepeatIdU8|RepeatIdU8Acc], _BinRepeatIdU8Acc2}
			end,
	{RepeatIdU8Tmp, _Bin5} = lists:foldl(FunRepeatIdU8, {[], _Bin4}, lists:duplicate(RepeatIdU8Count, 0)),
	RepeatIdU8 = lists:reverse(RepeatIdU8Tmp),
	{OptionalIdU8Flag, _Bin6} = ?D(u8, _Bin5),
	{OptionalIdU8, _Bin7} =
	case OptionalIdU8Flag of
		0 ->
			{undefined, _Bin6};
		1 ->
			?D(u8, _Bin6)
	end,
	{ok, {IdU8,IdU16,IdU32,RepeatIdU8,OptionalIdU8}};

%% 
unpack(40050, _Bin0) ->
	{IdU8, _Bin1} = ?D(u8, _Bin0),
	{IdU16, _Bin2} = ?D(u16, _Bin1),
	{IdU32, _Bin3} = ?D(u32, _Bin2),
	{RepeatIdU8Count, _Bin4} = ?D(u16, _Bin3),
	FunRepeatIdU8 = fun(_, {RepeatIdU8Acc, _BinRepeatIdU8Acc}) ->
				{FunRepeatIdU8, _BinRepeatIdU8Acc2} = ?D(u8, _BinRepeatIdU8Acc),
				{[FunRepeatIdU8|RepeatIdU8Acc], _BinRepeatIdU8Acc2}
			end,
	{RepeatIdU8Tmp, _Bin5} = lists:foldl(FunRepeatIdU8, {[], _Bin4}, lists:duplicate(RepeatIdU8Count, 0)),
	RepeatIdU8 = lists:reverse(RepeatIdU8Tmp),
	{OptionalIdU8Flag, _Bin6} = ?D(u8, _Bin5),
	{OptionalIdU8, _Bin7} =
	case OptionalIdU8Flag of
		0 ->
			{undefined, _Bin6};
		1 ->
			?D(u8, _Bin6)
	end,
	{ok, {IdU8,IdU16,IdU32,RepeatIdU8,OptionalIdU8}};

%% 
unpack(40060, _Bin0) ->
	{U64, _Bin1} = ?D(u64, _Bin0),
	{Strxx, _Bin2} = ?D(string, _Bin1),
	{MsgReq, _Bin3} = pb_struct:unpack_msg_test_php(_Bin2),
	{MsgOptFlag, _Bin4} = ?D(u8, _Bin3),
	{MsgOpt, _Bin5} =
	case MsgOptFlag of
		0 ->
			{undefined, _Bin4};
		1 ->
			pb_struct:unpack_msg_test_php(_Bin4)
	end,
	{MsgRepCount, _Bin6} = ?D(u16, _Bin5),
	FunMsgRep = fun(_, {MsgRepAcc, _BinMsgRepAcc}) ->
				{FunMsgRep, _BinMsgRepAcc2} = pb_struct:unpack_msg_test_php(_BinMsgRepAcc),
				{[FunMsgRep|MsgRepAcc], _BinMsgRepAcc2}
			end,
	{MsgRepTmp, _Bin7} = lists:foldl(FunMsgRep, {[], _Bin6}, lists:duplicate(MsgRepCount, 0)),
	MsgRep = lists:reverse(MsgRepTmp),
	{ok, {U64,Strxx,MsgReq,MsgOpt,MsgRep}};

%% 
unpack(40070, _Bin0) ->
	{U64, _Bin1} = ?D(u64, _Bin0),
	{Strxx, _Bin2} = ?D(string, _Bin1),
	{MsgReq, _Bin3} = pb_struct:unpack_msg_test_php(_Bin2),
	{MsgOptFlag, _Bin4} = ?D(u8, _Bin3),
	{MsgOpt, _Bin5} =
	case MsgOptFlag of
		0 ->
			{undefined, _Bin4};
		1 ->
			pb_struct:unpack_msg_test_php(_Bin4)
	end,
	{MsgRepCount, _Bin6} = ?D(u16, _Bin5),
	FunMsgRep = fun(_, {MsgRepAcc, _BinMsgRepAcc}) ->
				{FunMsgRep, _BinMsgRepAcc2} = pb_struct:unpack_msg_test_php(_BinMsgRepAcc),
				{[FunMsgRep|MsgRepAcc], _BinMsgRepAcc2}
			end,
	{MsgRepTmp, _Bin7} = lists:foldl(FunMsgRep, {[], _Bin6}, lists:duplicate(MsgRepCount, 0)),
	MsgRep = lists:reverse(MsgRepTmp),
	{ok, {U64,Strxx,MsgReq,MsgOpt,MsgRep}};

%% 
unpack(40080, _Bin0) ->
	{U64, _Bin1} = ?D(u64, _Bin0),
	{I64, _Bin2} = ?D(i64, _Bin1),
	{ok, {U64,I64}};

%% 
unpack(40090, _Bin0) ->
	{U64, _Bin1} = ?D(u64, _Bin0),
	{I64, _Bin2} = ?D(i64, _Bin1),
	{ok, {U64,I64}};

unpack(_Cmd, _Bin) -> 
	{error, {unknown_command, _Bin}}.
