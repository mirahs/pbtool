package proto

import (
	"packet"
)

type AckRoleRandNameOk struct {
	Uname                    string
}

func AckRoleRandNameOkDecode(pack *packet.Packet) *AckRoleRandNameOk {
	ackRoleRandNameOk := &AckRoleRandNameOk{}

	ackRoleRandNameOk.Uname = pack.ReadString()
	return ackRoleRandNameOk
}
