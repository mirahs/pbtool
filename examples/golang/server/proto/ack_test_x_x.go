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

func (this *AckTestXX) Encode() []byte {
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

	return pack.Encode(P_ACK_TEST_X_X)
}
