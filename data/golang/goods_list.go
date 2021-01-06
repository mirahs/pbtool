package proto

import (
	"packet"
)

type GoodsList struct {
	Goods                    []*GoodsItem
}

func (this *GoodsList) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	GoodsCount := uint16(len(this.Goods))
	pack.WriteUint16(GoodsCount)
	for i := uint16(0); i < GoodsCount; i++ {
		pack.WriteBytes(this.Goods[i].EncodeMsg())
	}

	return pack.Encode(uint16(2020))
}

func (this *GoodsList) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	GoodsCount := uint16(len(this.Goods))
	pack.WriteUint16(GoodsCount)
	for i := uint16(0); i < GoodsCount; i++ {
		pack.WriteBytes(this.Goods[i].EncodeMsg())
	}

	return pack.ReadBytes()
}

func GoodsListDecode(pack *packet.Packet) *GoodsList {
	goodsList := &GoodsList{}

	GoodsCount := pack.ReadUint16()
	for ;GoodsCount > 0; GoodsCount-- {
		goodsList.Goods = append(goodsList.Goods, GoodsItemDecode(pack))
	}
	return goodsList
}
