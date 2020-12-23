package proto

import (
	"packet"
)

type CTestXX struct {
	IdU8                     uint8
	IdU16                    uint16
	IdU32                    uint32
	RepeatIdU8               []uint8
	OptionalIdU8             uint8
}

func (this *CTestXX) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint8(this.IdU8)
	pack.WriteUint16(this.IdU16)
	pack.WriteUint32(this.IdU32)
	RepeatIdU8Count := uint16(len(this.RepeatIdU8))
	pack.WriteUint16(RepeatIdU8Count)
	for i := uint16(0); i < RepeatIdU8Count; i++ {
		pack.WriteUint8(this.RepeatIdU8[i])
	}
	if this.OptionalIdU8 != 0 {
		pack.WriteUint8(1)
		pack.WriteUint8(this.OptionalIdU8)
	} else {
		pack.WriteUint8(0)
	}

	return pack.Encode(uint16(40040))
}

func (this *CTestXX) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint8(this.IdU8)
	pack.WriteUint16(this.IdU16)
	pack.WriteUint32(this.IdU32)
	RepeatIdU8Count := uint16(len(this.RepeatIdU8))
	pack.WriteUint16(RepeatIdU8Count)
	for i := uint16(0); i < RepeatIdU8Count; i++ {
		pack.WriteUint8(this.RepeatIdU8[i])
	}
	if this.OptionalIdU8 != 0 {
		pack.WriteUint8(1)
		pack.WriteUint8(this.OptionalIdU8)
	} else {
		pack.WriteUint8(0)
	}

	return pack.ReadBytes()
}

func CTestXXDecode(pack *packet.Packet) *CTestXX {
	cTestXX := &CTestXX{}

	cTestXX.IdU8 = pack.ReadUint8()
	cTestXX.IdU16 = pack.ReadUint16()
	cTestXX.IdU32 = pack.ReadUint32()
	RepeatIdU8Count := pack.ReadUint16()
	for ;RepeatIdU8Count > 0; RepeatIdU8Count-- {
		cTestXX.RepeatIdU8 = append(cTestXX.RepeatIdU8, pack.ReadUint8())
	}
	OptionalIdU8Flag := pack.ReadUint8()
	if OptionalIdU8Flag == 1 {
		cTestXX.OptionalIdU8 = pack.ReadUint8()
	}
	return cTestXX
}
