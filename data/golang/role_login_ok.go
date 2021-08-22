package pb

import (
	"packet"
)

// 登录成功
type RoleLoginOk struct {
	Uid                      uint32 //玩家ID
	Uname                    string //玩家名字
	GoodsItem                []*GoodsItem //物品列表
}

func (this *RoleLoginOk) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.Uid)
	pack.WriteString(this.Uname)
	GoodsItemCount := uint16(len(this.GoodsItem))
	pack.WriteUint16(GoodsItemCount)
	for i := uint16(0); i < GoodsItemCount; i++ {
		pack.WriteBytes(this.GoodsItem[i].EncodeMsg())
	}

	return pack.Encode(uint16(1020))
}

func (this *RoleLoginOk) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.Uid)
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

	roleLoginOk.Uid = pack.ReadUint32()
	roleLoginOk.Uname = pack.ReadString()
	GoodsItemCount := pack.ReadUint16()
	for ;GoodsItemCount > 0; GoodsItemCount-- {
		roleLoginOk.GoodsItem = append(roleLoginOk.GoodsItem, GoodsItemDecode(pack))
	}
	return roleLoginOk
}
