package proto

import (
	"packet"
)

type AckTestSendOk struct {
	IdU8                     uint8
	RoleBase                 *MsgRoleBase
	IdF32                    []float32
	IdOpU8                   uint8
	OpRoleBase               *MsgRoleBase
}

func (this *AckTestSendOk) Encode() []byte {
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

	return pack.Encode(P_ACK_TEST_SEND_OK)
}
