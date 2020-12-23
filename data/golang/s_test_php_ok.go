package proto

import (
	"packet"
)

type STestPhpOk struct {
	U64                      uint64
	Strxx                    string
	MsgReq                   *MsgTestPhp
	MsgOpt                   *MsgTestPhp
	MsgRep                   []*MsgTestPhp
}

func (this *STestPhpOk) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint64(this.U64)
	pack.WriteString(this.Strxx)
	pack.WriteBytes(this.MsgReq.EncodeMsg())
	if this.MsgOpt != nil {
		pack.WriteUint8(1)
		pack.WriteBytes(this.MsgOpt.EncodeMsg())
	} else {
		pack.WriteUint8(0)
	}
	MsgRepCount := uint16(len(this.MsgRep))
	pack.WriteUint16(MsgRepCount)
	for i := uint16(0); i < MsgRepCount; i++ {
		pack.WriteBytes(this.MsgRep[i].EncodeMsg())
	}

	return pack.Encode(uint16(40070))
}

func (this *STestPhpOk) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint64(this.U64)
	pack.WriteString(this.Strxx)
	pack.WriteBytes(this.MsgReq.EncodeMsg())
	if this.MsgOpt != nil {
		pack.WriteUint8(1)
		pack.WriteBytes(this.MsgOpt.EncodeMsg())
	} else {
		pack.WriteUint8(0)
	}
	MsgRepCount := uint16(len(this.MsgRep))
	pack.WriteUint16(MsgRepCount)
	for i := uint16(0); i < MsgRepCount; i++ {
		pack.WriteBytes(this.MsgRep[i].EncodeMsg())
	}

	return pack.ReadBytes()
}

func STestPhpOkDecode(pack *packet.Packet) *STestPhpOk {
	sTestPhpOk := &STestPhpOk{}

	sTestPhpOk.U64 = pack.ReadUint64()
	sTestPhpOk.Strxx = pack.ReadString()
	sTestPhpOk.MsgReq = MsgTestPhpDecode(pack)
	MsgOptFlag := pack.ReadUint8()
	if MsgOptFlag == 1 {
		sTestPhpOk.MsgOpt = MsgTestPhpDecode(pack)
	}
	MsgRepCount := pack.ReadUint16()
	for ;MsgRepCount > 0; MsgRepCount-- {
		sTestPhpOk.MsgRep = append(sTestPhpOk.MsgRep, MsgTestPhpDecode(pack))
	}
	return sTestPhpOk
}
