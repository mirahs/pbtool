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

func AckTestSendOkDecode(pack *packet.Packet) *AckTestSendOk {
	ackTestSendOk := &AckTestSendOk{}

	ackTestSendOk.IdU8 = pack.ReadUint8()
	ackTestSendOk.RoleBase = MsgRoleBaseDecode(pack)
	IdF32Count := pack.ReadUint16()
	for ;IdF32Count > 0; IdF32Count-- {
		ackTestSendOk.IdF32 = append(ackTestSendOk.IdF32, pack.ReadFloat32())
	}
	IdOpU8Flag := pack.ReadUint8()
	if IdOpU8Flag == 1 {
		ackTestSendOk.IdOpU8 = pack.ReadUint8()
	}
	OpRoleBaseFlag := pack.ReadUint8()
	if OpRoleBaseFlag == 1 {
		ackTestSendOk.OpRoleBase = MsgRoleBaseDecode(pack)
	}
	return ackTestSendOk
}
