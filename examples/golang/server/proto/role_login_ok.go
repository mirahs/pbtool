package proto

import (
	"packet"
)

type RoleLoginOk struct {
	Uname                    string
	GoodsItem                []*GoodsItem
}

func (this *RoleLoginOk) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteString(this.Uname)
	GoodsItemCount := uint16(len(this.GoodsItem))
	pack.WriteUint16(GoodsItemCount)
	for i := uint16(0); i < GoodsItemCount; i++ {
		pack.WriteBytes(this.GoodsItem[i].EncodeMsg())
	}

	return pack.Encode(uint16(1010))
}

func (this *RoleLoginOk) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteString(this.Uname)
	GoodsItemCount := uint16(len(this.GoodsItem))
	pack.WriteUint16(GoodsItemCount)
	for i := uint16(0); i < GoodsItemCount; i++ {
		pack.WriteBytes(this.GoodsItem[i].EncodeMsg())
	}

	return pack.ReadBytes()
}

func RoleLoginOkDecode(pack *packet.Packet) *RoleLoginOk {
	roleLoginOk := &RoleLoginOk{}

	roleLoginOk.Uname = pack.ReadString()
	GoodsItemCount := pack.ReadUint16()
	for ;GoodsItemCount > 0; GoodsItemCount-- {
		roleLoginOk.GoodsItem = append(roleLoginOk.GoodsItem, GoodsItemDecode(pack))
	}
	return roleLoginOk
}
