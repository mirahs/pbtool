-module(pb_goods).

-export([pack/2,pack_msg/2,unpack/2,unpack_msg/2]).


%% 物品数据
pack(2010 ,{Id,Num}) ->
	Bin1 = pb:encode(u32, Id),
	Bin2 = pb:encode(u16, Num),
	BinData = <<Bin1/binary,Bin2/binary>>,
	{ok, pb:msg(2010, BinData)};

%% 物品列表
pack(2020 ,{Goods}) ->
	FunGoods = fun(FGoods, {CountAcc, BinAcc}) ->
			FBin = pb_goods:pack_msg(2010, FGoods),
			{CountAcc + 1, <<BinAcc/binary,FBin/binary>>}
	end,
	{CountGoods, BinGoods} = lists:foldl(FunGoods, {0, <<>>}, Goods),
	Bin1 = pb:encode(u16, CountGoods),
	Bin2 = BinGoods,
	BinData = <<Bin1/binary,Bin2/binary>>,
	{ok, pb:msg(2020, BinData)};

pack(_Cmd, _Data) -> 
	{error, {unknown_command, _Data}}.


%% 物品数据
pack_msg(2010 ,{Id,Num}) ->
	Bin1 = pb:encode(u32, Id),
	Bin2 = pb:encode(u16, Num),
	<<Bin1/binary,Bin2/binary>>;

%% 物品列表
pack_msg(2020 ,{Goods}) ->
	FunGoods = fun(FGoods, {CountAcc, BinAcc}) ->
			FBin = pb_goods:pack_msg(2010, FGoods),
			{CountAcc + 1, <<BinAcc/binary,FBin/binary>>}
	end,
	{CountGoods, BinGoods} = lists:foldl(FunGoods, {0, <<>>}, Goods),
	Bin1 = pb:encode(u16, CountGoods),
	Bin2 = BinGoods,
	<<Bin1/binary,Bin2/binary>>;

pack_msg(_Cmd, _Data) -> 
	{error, {unknown_command, _Data}}.


%% 物品数据
unpack(2010, _Bin0) ->
	{Id, _Bin1} = pb:decode(u32, _Bin0),
	{Num, _Bin2} = pb:decode(u16, _Bin1),
	{ok, {Id,Num}};

%% 物品列表
unpack(2020, _Bin0) ->
	{GoodsCount, _Bin1} = pb:decode(u16, _Bin0),
	FunGoods = fun(_, {GoodsAcc, _BinGoodsAcc}) ->
				{FunGoods, _BinGoodsAcc2} = pb_goods:unpack_msg(2010, _BinGoodsAcc),
				{[FunGoods|GoodsAcc], _BinGoodsAcc2}
			end,
	{GoodsTmp, _Bin2} = lists:foldl(FunGoods, {[], _Bin1}, lists:duplicate(GoodsCount, 0)),
	Goods = lists:reverse(GoodsTmp),
	{ok, {Goods}};

unpack(_Cmd, _Bin) -> 
	{error, {unknown_command, _Bin}}.

%% 物品数据
unpack_msg(2010, _Bin0) ->
	{Id, _Bin1} = pb:decode(u32, _Bin0),
	{Num, _Bin2} = pb:decode(u16, _Bin1),
	{{Id,Num},_Bin2};

%% 物品列表
unpack_msg(2020, _Bin0) ->
	{GoodsCount, _Bin1} = pb:decode(u16, _Bin0),
	FunGoods = fun(_, {GoodsAcc, _BinGoodsAcc}) ->
				{FunGoods, _BinGoodsAcc2} = pb_goods:unpack_msg(2010, _BinGoodsAcc),
				{[FunGoods|GoodsAcc], _BinGoodsAcc2}
			end,
	{GoodsTmp, _Bin2} = lists:foldl(FunGoods, {[], _Bin1}, lists:duplicate(GoodsCount, 0)),
	Goods = lists:reverse(GoodsTmp),
	{{Goods},_Bin2};

unpack_msg(_Cmd, _Bin) -> 
	{error, {unknown_command, _Bin}}.
