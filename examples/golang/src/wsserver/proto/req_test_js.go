package proto

import (
	"packet"
)

type ReqTestJs struct {
	u64                      uint64
	i64                      int64
}

func ReqTestJsDecode(pack *packet.Packet) *ReqTestJs {
	reqTestJs := &ReqTestJs{}

	reqTestJs.u64 = pack.ReadUint64()
	reqTestJs.i64 = pack.ReadInt64()
	return reqTestJs
}

func (this *ReqTestJs) GetU64() uint64 {
	return this.u64
}

func (this *ReqTestJs) GetI64() int64 {
	return this.i64
}
