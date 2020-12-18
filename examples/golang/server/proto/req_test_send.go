package proto

import (
	"packet"
)

type ReqTestSend struct {
	IdU8                     uint8
	RoleBase                 *MsgRoleBase
	IdF32                    []float32
	IdOpU8                   uint8
	OpRoleBase               *MsgRoleBase
}

func ReqTestSendDecode(pack *packet.Packet) *ReqTestSend {
	reqTestSend := &ReqTestSend{}

	reqTestSend.IdU8 = pack.ReadUint8()
	reqTestSend.RoleBase = MsgRoleBaseDecode(pack)
	IdF32Count := pack.ReadUint16()
	for ;IdF32Count > 0; IdF32Count-- {
		reqTestSend.IdF32 = append(reqTestSend.IdF32, pack.ReadFloat32())
	}
	IdOpU8Flag := pack.ReadUint8()
	if IdOpU8Flag == 1 {
		reqTestSend.IdOpU8 = pack.ReadUint8()
	}
	OpRoleBaseFlag := pack.ReadUint8()
	if OpRoleBaseFlag == 1 {
		reqTestSend.OpRoleBase = MsgRoleBaseDecode(pack)
	}
	return reqTestSend
}
