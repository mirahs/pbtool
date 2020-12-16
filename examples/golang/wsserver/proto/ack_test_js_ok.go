package proto

import (
	"packet"
)

type AckTestJsOk struct {
	u64                      uint64
	i64                      int64
}

func (this *AckTestJsOk) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint64(this.u64)
	pack.WriteInt64(this.i64)

	return pack.Encode(P_ACK_TEST_JS_OK)
}

func (this *AckTestJsOk) SetU64(u64 uint64) {
	this.u64 = u64
}

func (this *AckTestJsOk) SetI64(i64 int64) {
	this.i64 = i64
}
