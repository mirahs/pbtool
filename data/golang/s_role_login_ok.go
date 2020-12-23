package proto

import (
	"packet"
)

type SRoleLoginOk struct {
	Uname                    string
}

func (this *SRoleLoginOk) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteString(this.Uname)

	return pack.Encode(uint16(1050))
}

func (this *SRoleLoginOk) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteString(this.Uname)

	return pack.ReadBytes()
}

func SRoleLoginOkDecode(pack *packet.Packet) *SRoleLoginOk {
	sRoleLoginOk := &SRoleLoginOk{}

	sRoleLoginOk.Uname = pack.ReadString()
	return sRoleLoginOk
}
