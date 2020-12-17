package proto

import (
	"packet"
)

type AckRoleLoginOk struct {
	Uname                    string
}

func AckRoleLoginOkDecode(pack *packet.Packet) *AckRoleLoginOk {
	ackRoleLoginOk := &AckRoleLoginOk{}

	ackRoleLoginOk.Uname = pack.ReadString()
	return ackRoleLoginOk
}
