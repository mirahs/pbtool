package proto

import (
	"packet"
)

type MsgTestXX struct {
	IdU8                     uint8
	IdF32                    []float32
	IdOpU8                   uint8
}

func (this *MsgTestXX) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint8(this.IdU8)
	IdF32Count := uint16(len(this.IdF32))
	pack.WriteUint16(IdF32Count)
	for i := uint16(0); i < IdF32Count; i++ {
		pack.WriteFloat32(this.IdF32[i])
	}
	if this.IdOpU8 != 0 {
		pack.WriteUint8(1)
		pack.WriteUint8(this.IdOpU8)
	} else {
		pack.WriteUint8(0)
	}

	return pack.ReadBytes()
}

func MsgTestXXDecode(pack *packet.Packet) *MsgTestXX {
	msgTestXX := &MsgTestXX{}

	msgTestXX.IdU8 = pack.ReadUint8()
	IdF32Count := pack.ReadUint16()
	for ;IdF32Count > 0; IdF32Count-- {
		msgTestXX.IdF32 = append(msgTestXX.IdF32, pack.ReadFloat32())
	}
	IdOpU8Flag := pack.ReadUint8()
	if IdOpU8Flag == 1 {
		msgTestXX.IdOpU8 = pack.ReadUint8()
	}
	return msgTestXX
}
