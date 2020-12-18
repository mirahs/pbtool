package proto

import (
	"packet"
)

type AckTestJsOk struct {
	U64                      uint64
	I64                      int64
}

func (this *AckTestJsOk) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint64(this.U64)
	pack.WriteInt64(this.I64)

	return pack.Encode(P_ACK_TEST_JS_OK)
}
