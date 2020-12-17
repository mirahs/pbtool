package proto

import (
	"packet"
)

type AckRoleLoginOk struct {
	Uname                    string
}

func (this *AckRoleLoginOk) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteString(this.Uname)

	return pack.Encode(P_ACK_ROLE_LOGIN_OK)
}
