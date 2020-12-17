package proto

import (
	"packet"
)

type AckTestXX struct {
	IdU8                     uint8
	IdU16                    uint16
	IdU32                    uint32
	RepeatIdU8               []uint8
	OptionalIdU8             uint8
}

func AckTestXXDecode(pack *packet.Packet) *AckTestXX {
	ackTestXX := &AckTestXX{}

	ackTestXX.IdU8 = pack.ReadUint8()
	ackTestXX.IdU16 = pack.ReadUint16()
	ackTestXX.IdU32 = pack.ReadUint32()
	RepeatIdU8Count := pack.ReadUint16()
	for ;RepeatIdU8Count > 0; RepeatIdU8Count-- {
		ackTestXX.RepeatIdU8 = append(ackTestXX.RepeatIdU8, pack.ReadUint8())
	}
	OptionalIdU8Flag := pack.ReadUint8()
	if OptionalIdU8Flag == 1 {
		ackTestXX.OptionalIdU8 = pack.ReadUint8()
	}
	return ackTestXX
}
