package proto

import (
	"packet"
)

type STestJsOk struct {
	U64                      uint64
	I64                      int64
}

func (this *STestJsOk) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint64(this.U64)
	pack.WriteInt64(this.I64)

	return pack.Encode(uint16(40090))
}

func (this *STestJsOk) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint64(this.U64)
	pack.WriteInt64(this.I64)

	return pack.ReadBytes()
}

func STestJsOkDecode(pack *packet.Packet) *STestJsOk {
	sTestJsOk := &STestJsOk{}

	sTestJsOk.U64 = pack.ReadUint64()
	sTestJsOk.I64 = pack.ReadInt64()
	return sTestJsOk
}
