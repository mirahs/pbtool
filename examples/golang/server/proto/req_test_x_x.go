package proto

import (
	"packet"
)

type ReqTestXX struct {
	IdU8                     uint8
	IdU16                    uint16
	IdU32                    uint32
	RepeatIdU8               []uint8
	OptionalIdU8             uint8
}

func ReqTestXXDecode(pack *packet.Packet) *ReqTestXX {
	reqTestXX := &ReqTestXX{}

	reqTestXX.IdU8 = pack.ReadUint8()
	reqTestXX.IdU16 = pack.ReadUint16()
	reqTestXX.IdU32 = pack.ReadUint32()
	RepeatIdU8Count := pack.ReadUint16()
	for ;RepeatIdU8Count > 0; RepeatIdU8Count-- {
		reqTestXX.RepeatIdU8 = append(reqTestXX.RepeatIdU8, pack.ReadUint8())
	}
	OptionalIdU8Flag := pack.ReadUint8()
	if OptionalIdU8Flag == 1 {
		reqTestXX.OptionalIdU8 = pack.ReadUint8()
	}
	return reqTestXX
}
