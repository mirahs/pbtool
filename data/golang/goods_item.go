package pb

import (
	"packet"
)

// 物品数据
type GoodsItem struct {
	Id                       uint32 //物品ID
	Num                      uint16 //物品数量
}

func (this *GoodsItem) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.Id)
	pack.WriteUint16(this.Num)

	return pack.Encode(uint16(2010))
}

func (this *GoodsItem) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.Id)
	pack.WriteUint16(this.Num)

	return pack.ReadBytes()
}

func GoodsItemDecode(pack *packet.Packet) *GoodsItem {
	goodsItem := &GoodsItem{}

	goodsItem.Id = pack.ReadUint32()
	goodsItem.Num = pack.ReadUint16()
	return goodsItem
}
