package proto

import (
	"packet"
)

type AckTestJsOk struct {
	U64                      uint64
	I64                      int64
}

func AckTestJsOkDecode(pack *packet.Packet) *AckTestJsOk {
	ackTestJsOk := &AckTestJsOk{}

	ackTestJsOk.U64 = pack.ReadUint64()
	ackTestJsOk.I64 = pack.ReadInt64()
	return ackTestJsOk
}
