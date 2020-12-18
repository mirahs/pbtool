package proto

import (
	"packet"
)

type ReqTestPhp struct {
	U64                      uint64
	Strxx                    string
	MsgReq                   *MsgTestPhp
	MsgOpt                   *MsgTestPhp
	MsgRep                   []*MsgTestPhp
}

func ReqTestPhpDecode(pack *packet.Packet) *ReqTestPhp {
	reqTestPhp := &ReqTestPhp{}

	reqTestPhp.U64 = pack.ReadUint64()
	reqTestPhp.Strxx = pack.ReadString()
	reqTestPhp.MsgReq = MsgTestPhpDecode(pack)
	MsgOptFlag := pack.ReadUint8()
	if MsgOptFlag == 1 {
		reqTestPhp.MsgOpt = MsgTestPhpDecode(pack)
	}
	MsgRepCount := pack.ReadUint16()
	for ;MsgRepCount > 0; MsgRepCount-- {
		reqTestPhp.MsgRep = append(reqTestPhp.MsgRep, MsgTestPhpDecode(pack))
	}
	return reqTestPhp
}
