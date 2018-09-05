package proto

import (
	"packet"
)

type ReqTestJsOk struct {
	u64                      uint64
	i64                      int64
}

func ReqTestJsOkDecode(pack *packet.Packet) *ReqTestJsOk {
	reqTestJsOk := &ReqTestJsOk{}

	reqTestJsOk.u64 = pack.ReadUint64()
	reqTestJsOk.i64 = pack.ReadInt64()
	return reqTestJsOk
}

func (this *ReqTestJsOk) GetU64() uint64 {
	return this.u64
}

func (this *ReqTestJsOk) GetI64() int64 {
	return this.i64
}
