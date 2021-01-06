-module(pb_role).

-export([pack/2,pack_msg/2,unpack/2,unpack_msg/2]).


%% 登录成功
pack(1010 ,{Uname,GoodsItem}) ->
	Bin1 = pb:encode(string, Uname),
	FunGoodsItem = fun(FGoodsItem, {CountAcc, BinAcc}) ->
			FBin = pb_goods:pack_msg(3010, FGoodsItem),
			{CountAcc + 1, <<BinAcc/binary,FBin/binary>>}
	end,
	{CountGoodsItem, BinGoodsItem} = lists:foldl(FunGoodsItem, {0, <<>>}, GoodsItem),
	Bin2 = pb:encode(u16, CountGoodsItem),
	Bin3 = BinGoodsItem,
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary>>,
	{ok, pb:msg(1010, BinData)};

pack(_Cmd, _Data) -> 
	{error, {unknown_command, _Data}}.


%% 登录成功
pack_msg(1010 ,{Uname,GoodsItem}) ->
	Bin1 = pb:encode(string, Uname),
	FunGoodsItem = fun(FGoodsItem, {CountAcc, BinAcc}) ->
			FBin = pb_goods:pack_msg(3010, FGoodsItem),
			{CountAcc + 1, <<BinAcc/binary,FBin/binary>>}
	end,
	{CountGoodsItem, BinGoodsItem} = lists:foldl(FunGoodsItem, {0, <<>>}, GoodsItem),
	Bin2 = pb:encode(u16, CountGoodsItem),
	Bin3 = BinGoodsItem,
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary>>,
	{ok, BinData};

pack_msg(_Cmd, _Data) -> 
	{error, {unknown_command, _Data}}.


%% 登录成功
unpack(1010, _Bin0) ->
	{Uname, _Bin1} = pb:decode(string, _Bin0),
	{GoodsItemCount, _Bin2} = pb:decode(u16, _Bin1),
	FunGoodsItem = fun(_, {GoodsItemAcc, _BinGoodsItemAcc}) ->
				{FunGoodsItem, _BinGoodsItemAcc2} = pb_goods:unpack_msg(3010, _BinGoodsItemAcc),
				{[FunGoodsItem|GoodsItemAcc], _BinGoodsItemAcc2}
			end,
	{GoodsItemTmp, _Bin3} = lists:foldl(FunGoodsItem, {[], _Bin2}, lists:duplicate(GoodsItemCount, 0)),
	GoodsItem = lists:reverse(GoodsItemTmp),
	{ok, {Uname,GoodsItem}};

unpack(_Cmd, _Bin) -> 
	{error, {unknown_command, _Bin}}.

%% 登录成功
unpack_msg(1010, _Bin0) ->
	{Uname, _Bin1} = pb:decode(string, _Bin0),
	{GoodsItemCount, _Bin2} = pb:decode(u16, _Bin1),
	FunGoodsItem = fun(_, {GoodsItemAcc, _BinGoodsItemAcc}) ->
				{FunGoodsItem, _BinGoodsItemAcc2} = pb_goods:unpack_msg(3010, _BinGoodsItemAcc),
				{[FunGoodsItem|GoodsItemAcc], _BinGoodsItemAcc2}
			end,
	{GoodsItemTmp, _Bin3} = lists:foldl(FunGoodsItem, {[], _Bin2}, lists:duplicate(GoodsItemCount, 0)),
	GoodsItem = lists:reverse(GoodsItemTmp),
	{{Uname,GoodsItem},_Bin3};

unpack_msg(_Cmd, _Bin) -> 
	{error, {unknown_command, _Bin}}.
