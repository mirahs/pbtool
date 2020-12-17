package proto

import (
	"packet"
)

type MsgRoleBase struct {
	Uid                      uint32
	Uname                    string
}

func (this *MsgRoleBase) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.Uid)
	pack.WriteString(this.Uname)

	return pack.ReadBytes()
}

func MsgRoleBaseDecode(pack *packet.Packet) *MsgRoleBase {
	msgRoleBase := &MsgRoleBase{}

	msgRoleBase.Uid = pack.ReadUint32()
	msgRoleBase.Uname = pack.ReadString()
	return msgRoleBase
}
