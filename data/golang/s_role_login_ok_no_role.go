package proto

import (
	"packet"
)

type SRoleLoginOkNoRole struct {
}

func (this *SRoleLoginOkNoRole) Encode() []byte {
	pack := packet.NewWriteBuff(64)


	return pack.Encode(uint16(1060))
}

func (this *SRoleLoginOkNoRole) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)


	return pack.ReadBytes()
}

func SRoleLoginOkNoRoleDecode(pack *packet.Packet) *SRoleLoginOkNoRole {
	sRoleLoginOkNoRole := &SRoleLoginOkNoRole{}

	return sRoleLoginOkNoRole
}
