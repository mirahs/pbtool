package proto

import (
	"packet"
)

type SRoleRandNameOk struct {
	Uname                    string
}

func (this *SRoleRandNameOk) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteString(this.Uname)

	return pack.Encode(uint16(1040))
}

func (this *SRoleRandNameOk) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteString(this.Uname)

	return pack.ReadBytes()
}

func SRoleRandNameOkDecode(pack *packet.Packet) *SRoleRandNameOk {
	sRoleRandNameOk := &SRoleRandNameOk{}

	sRoleRandNameOk.Uname = pack.ReadString()
	return sRoleRandNameOk
}
