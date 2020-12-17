package proto

import (
	"packet"
)

type MsgFriendBaseAdd struct {
	Uid                      uint32
	Uname                    string
}

func (this *MsgFriendBaseAdd) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.Uid)
	pack.WriteString(this.Uname)

	return pack.ReadBytes()
}

func MsgFriendBaseAddDecode(pack *packet.Packet) *MsgFriendBaseAdd {
	msgFriendBaseAdd := &MsgFriendBaseAdd{}

	msgFriendBaseAdd.Uid = pack.ReadUint32()
	msgFriendBaseAdd.Uname = pack.ReadString()
	return msgFriendBaseAdd
}
