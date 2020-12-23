package proto

import (
	"packet"
)

type CRoleRandName struct {
}

func (this *CRoleRandName) Encode() []byte {
	pack := packet.NewWriteBuff(64)


	return pack.Encode(uint16(1030))
}

func (this *CRoleRandName) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)


	return pack.ReadBytes()
}

func CRoleRandNameDecode(pack *packet.Packet) *CRoleRandName {
	cRoleRandName := &CRoleRandName{}

	return cRoleRandName
}
