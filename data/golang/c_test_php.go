package proto

import (
	"packet"
)

type CTestPhp struct {
	U64                      uint64
	Strxx                    string
	MsgReq                   *MsgTestPhp
	MsgOpt                   *MsgTestPhp
	MsgRep                   []*MsgTestPhp
}

func (this *CTestPhp) Encode() []byte {
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

	return pack.Encode(uint16(40060))
}

func (this *CTestPhp) EncodeMsg() []byte {
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

func CTestPhpDecode(pack *packet.Packet) *CTestPhp {
	cTestPhp := &CTestPhp{}

	cTestPhp.U64 = pack.ReadUint64()
	cTestPhp.Strxx = pack.ReadString()
	cTestPhp.MsgReq = MsgTestPhpDecode(pack)
	MsgOptFlag := pack.ReadUint8()
	if MsgOptFlag == 1 {
		cTestPhp.MsgOpt = MsgTestPhpDecode(pack)
	}
	MsgRepCount := pack.ReadUint16()
	for ;MsgRepCount > 0; MsgRepCount-- {
		cTestPhp.MsgRep = append(cTestPhp.MsgRep, MsgTestPhpDecode(pack))
	}
	return cTestPhp
}
