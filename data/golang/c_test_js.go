package proto

import (
	"packet"
)

type CTestJs struct {
	U64                      uint64
	I64                      int64
}

func (this *CTestJs) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint64(this.U64)
	pack.WriteInt64(this.I64)

	return pack.Encode(uint16(40080))
}

func (this *CTestJs) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint64(this.U64)
	pack.WriteInt64(this.I64)

	return pack.ReadBytes()
}

func CTestJsDecode(pack *packet.Packet) *CTestJs {
	cTestJs := &CTestJs{}

	cTestJs.U64 = pack.ReadUint64()
	cTestJs.I64 = pack.ReadInt64()
	return cTestJs
}
