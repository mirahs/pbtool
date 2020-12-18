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

func (this *ReqTestPhp) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint64(this.U64)
	pack.WriteString(this.Strxx)
	pack.WriteBytes(this.MsgReq.Encode())
	if this.MsgOpt != nil {
		pack.WriteUint8(1)
		pack.WriteBytes(this.MsgOpt.Encode())
	} else {
		pack.WriteUint8(0)
	}
	MsgRepCount := uint16(len(this.MsgRep))
	pack.WriteUint16(MsgRepCount)
	for i := uint16(0); i < MsgRepCount; i++ {
		pack.WriteBytes(this.MsgRep[i].Encode())
	}

	return pack.Encode(P_REQ_TEST_PHP)
}
