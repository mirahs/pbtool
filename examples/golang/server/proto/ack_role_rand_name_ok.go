package proto

import (
	"packet"
)

type AckRoleRandNameOk struct {
	Uname                    string
}

func (this *AckRoleRandNameOk) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteString(this.Uname)

	return pack.Encode(P_ACK_ROLE_RAND_NAME_OK)
}
