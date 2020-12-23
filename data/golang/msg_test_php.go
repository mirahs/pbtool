package proto

import (
	"packet"
)

type MsgTestPhp struct {
	U16                      uint16
}

func (this *MsgTestPhp) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint16(this.U16)

	return pack.Encode(uint16(0))
}

func (this *MsgTestPhp) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint16(this.U16)

	return pack.ReadBytes()
}

func MsgTestPhpDecode(pack *packet.Packet) *MsgTestPhp {
	msgTestPhp := &MsgTestPhp{}

	msgTestPhp.U16 = pack.ReadUint16()
	return msgTestPhp
}
