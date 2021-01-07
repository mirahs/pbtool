-module(pb_role).

-export([pack/2,pack_msg/2,unpack/2,unpack_msg/2]).


%% 请求登录
pack(1010 ,{Account,Password}) ->
	Bin1 = pb:encode(string, Account),
	Bin2 = pb:encode(string, Password),
	BinData = <<Bin1/binary,Bin2/binary>>,
	{ok, pb:msg(1010, BinData)};

%% 登录成功
pack(1020 ,{Uid,Uname,GoodsItem}) ->
	Bin1 = pb:encode(u32, Uid),
	Bin2 = pb:encode(string, Uname),
	FunGoodsItem = fun(FGoodsItem, {CountAcc, BinAcc}) ->
			FBin = pb_goods:pack_msg(2010, FGoodsItem),
			{CountAcc + 1, <<BinAcc/binary,FBin/binary>>}
	end,
	{CountGoodsItem, BinGoodsItem} = lists:foldl(FunGoodsItem, {0, <<>>}, GoodsItem),
	Bin3 = pb:encode(u16, CountGoodsItem),
	Bin4 = BinGoodsItem,
	BinData = <<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary>>,
	{ok, pb:msg(1020, BinData)};

pack(_Cmd, _Data) -> 
	{error, {unknown_command, _Data}}.


%% 请求登录
pack_msg(1010 ,{Account,Password}) ->
	Bin1 = pb:encode(string, Account),
	Bin2 = pb:encode(string, Password),
	<<Bin1/binary,Bin2/binary>>;

%% 登录成功
pack_msg(1020 ,{Uid,Uname,GoodsItem}) ->
	Bin1 = pb:encode(u32, Uid),
	Bin2 = pb:encode(string, Uname),
	FunGoodsItem = fun(FGoodsItem, {CountAcc, BinAcc}) ->
			FBin = pb_goods:pack_msg(2010, FGoodsItem),
			{CountAcc + 1, <<BinAcc/binary,FBin/binary>>}
	end,
	{CountGoodsItem, BinGoodsItem} = lists:foldl(FunGoodsItem, {0, <<>>}, GoodsItem),
	Bin3 = pb:encode(u16, CountGoodsItem),
	Bin4 = BinGoodsItem,
	<<Bin1/binary,Bin2/binary,Bin3/binary,Bin4/binary>>;

pack_msg(_Cmd, _Data) -> 
	{error, {unknown_command, _Data}}.


%% 请求登录
unpack(1010, _Bin0) ->
	{Account, _Bin1} = pb:decode(string, _Bin0),
	{Password, _Bin2} = pb:decode(string, _Bin1),
	{ok, {Account,Password}};

%% 登录成功
unpack(1020, _Bin0) ->
	{Uid, _Bin1} = pb:decode(u32, _Bin0),
	{Uname, _Bin2} = pb:decode(string, _Bin1),
	{GoodsItemCount, _Bin3} = pb:decode(u16, _Bin2),
	FunGoodsItem = fun(_, {GoodsItemAcc, _BinGoodsItemAcc}) ->
				{FunGoodsItem, _BinGoodsItemAcc2} = pb_goods:unpack_msg(2010, _BinGoodsItemAcc),
				{[FunGoodsItem|GoodsItemAcc], _BinGoodsItemAcc2}
			end,
	{GoodsItemTmp, _Bin4} = lists:foldl(FunGoodsItem, {[], _Bin3}, lists:duplicate(GoodsItemCount, 0)),
	GoodsItem = lists:reverse(GoodsItemTmp),
	{ok, {Uid,Uname,GoodsItem}};

unpack(_Cmd, _Bin) -> 
	{error, {unknown_command, _Bin}}.

%% 请求登录
unpack_msg(1010, _Bin0) ->
	{Account, _Bin1} = pb:decode(string, _Bin0),
	{Password, _Bin2} = pb:decode(string, _Bin1),
	{{Account,Password},_Bin2};

%% 登录成功
unpack_msg(1020, _Bin0) ->
	{Uid, _Bin1} = pb:decode(u32, _Bin0),
	{Uname, _Bin2} = pb:decode(string, _Bin1),
	{GoodsItemCount, _Bin3} = pb:decode(u16, _Bin2),
	FunGoodsItem = fun(_, {GoodsItemAcc, _BinGoodsItemAcc}) ->
				{FunGoodsItem, _BinGoodsItemAcc2} = pb_goods:unpack_msg(2010, _BinGoodsItemAcc),
				{[FunGoodsItem|GoodsItemAcc], _BinGoodsItemAcc2}
			end,
	{GoodsItemTmp, _Bin4} = lists:foldl(FunGoodsItem, {[], _Bin3}, lists:duplicate(GoodsItemCount, 0)),
	GoodsItem = lists:reverse(GoodsItemTmp),
	{{Uid,Uname,GoodsItem},_Bin4};

unpack_msg(_Cmd, _Bin) -> 
	{error, {unknown_command, _Bin}}.
