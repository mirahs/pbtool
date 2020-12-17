package proto

import (
	"packet"
)

type MsgTestSend struct {
	IdU8                     uint8
	RoleBase                 *MsgRoleBase
	IdF32                    []float32
	IdOpU8                   uint8
	OpRoleBase               *MsgRoleBase
}

func (this *MsgTestSend) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint8(this.IdU8)
	pack.WriteBytes(this.RoleBase.Encode())
	IdF32Count := uint16(len(this.IdF32))
	pack.WriteUint16(IdF32Count)
	for i := uint16(0); i < IdF32Count; i++ {
		pack.WriteFloat32(this.IdF32[i])
	}
	if this.IdOpU8 != 0 {
		pack.WriteUint8(1)
		pack.WriteUint8(this.IdOpU8)
	} else {
		pack.WriteUint8(0)
	}
	if this.OpRoleBase != nil {
		pack.WriteUint8(1)
		pack.WriteBytes(this.OpRoleBase.Encode())
	} else {
		pack.WriteUint8(0)
	}

	return pack.ReadBytes()
}

func MsgTestSendDecode(pack *packet.Packet) *MsgTestSend {
	msgTestSend := &MsgTestSend{}

	msgTestSend.IdU8 = pack.ReadUint8()
	msgTestSend.RoleBase = MsgRoleBaseDecode(pack)
	IdF32Count := pack.ReadUint16()
	for ;IdF32Count > 0; IdF32Count-- {
		msgTestSend.IdF32 = append(msgTestSend.IdF32, pack.ReadFloat32())
	}
	IdOpU8Flag := pack.ReadUint8()
	if IdOpU8Flag == 1 {
		msgTestSend.IdOpU8 = pack.ReadUint8()
	}
	OpRoleBaseFlag := pack.ReadUint8()
	if OpRoleBaseFlag == 1 {
		msgTestSend.OpRoleBase = MsgRoleBaseDecode(pack)
	}
	return msgTestSend
}
