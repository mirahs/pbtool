package proto

import (
	"packet"
)

type AckTestPhpOk struct {
	U64                      uint64
	Strxx                    string
	MsgReq                   *MsgTestPhp
	MsgOpt                   *MsgTestPhp
	MsgRep                   []*MsgTestPhp
}

func AckTestPhpOkDecode(pack *packet.Packet) *AckTestPhpOk {
	ackTestPhpOk := &AckTestPhpOk{}

	ackTestPhpOk.U64 = pack.ReadUint64()
	ackTestPhpOk.Strxx = pack.ReadString()
	ackTestPhpOk.MsgReq = MsgTestPhpDecode(pack)
	MsgOptFlag := pack.ReadUint8()
	if MsgOptFlag == 1 {
		ackTestPhpOk.MsgOpt = MsgTestPhpDecode(pack)
	}
	MsgRepCount := pack.ReadUint16()
	for ;MsgRepCount > 0; MsgRepCount-- {
		ackTestPhpOk.MsgRep = append(ackTestPhpOk.MsgRep, MsgTestPhpDecode(pack))
	}
	return ackTestPhpOk
}
