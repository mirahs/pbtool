package proto

import (
	"packet"
)

type AckTestJsOk struct {
	u64                      uint64
	i64                      int64
}

func AckTestJsOkDecode(pack *packet.Packet) *AckTestJsOk {
	ackTestJsOk := &AckTestJsOk{}

	ackTestJsOk.u64 = pack.ReadUint64()
	ackTestJsOk.i64 = pack.ReadInt64()
	return ackTestJsOk
}

func (this *AckTestJsOk) GetU64() uint64 {
	return this.u64
}

func (this *AckTestJsOk) GetI64() int64 {
	return this.i64
}
