package proto

import (
	"packet"
)

type ReqRoleLogin struct {
	Uid                      uint32
	Uuid                     uint32
	Sid                      uint16
	Cid                      uint16
	LoginTime                uint32
	Pwd                      string
	Relink                   uint8
	Debug                    uint8
	Os                       string
	Version                  string
}

func (this *ReqRoleLogin) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.Uid)
	pack.WriteUint32(this.Uuid)
	pack.WriteUint16(this.Sid)
	pack.WriteUint16(this.Cid)
	pack.WriteUint32(this.LoginTime)
	pack.WriteString(this.Pwd)
	pack.WriteUint8(this.Relink)
	pack.WriteUint8(this.Debug)
	pack.WriteString(this.Os)
	pack.WriteString(this.Version)

	return pack.Encode(P_REQ_ROLE_LOGIN)
}
