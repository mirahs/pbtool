package proto

import (
	"packet"
)

type ReqTestJs struct {
	U64                      uint64
	I64                      int64
}

func ReqTestJsDecode(pack *packet.Packet) *ReqTestJs {
	reqTestJs := &ReqTestJs{}

	reqTestJs.U64 = pack.ReadUint64()
	reqTestJs.I64 = pack.ReadInt64()
	return reqTestJs
}
