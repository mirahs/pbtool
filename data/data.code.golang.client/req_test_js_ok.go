package proto

import (
	"packet"
)

type ReqTestJsOk struct {
	u64                      uint64
	i64                      int64
}

func (this *ReqTestJsOk) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint64(this.u64)
	pack.WriteInt64(this.i64)

	return pack.Encode(P_REQ_TEST_JS_OK)
}

func (this *ReqTestJsOk) SetU64(u64 uint64) {
	this.u64 = u64
}

func (this *ReqTestJsOk) SetI64(i64 int64) {
	this.i64 = i64
}
