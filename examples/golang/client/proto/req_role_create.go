package proto

import (
	"packet"
)

type ReqRoleCreate struct {
	Uid                      uint32
	Uuid                     uint32
	Sid                      uint16
	Cid                      uint16
	Os                       string
	Version                  string
	Uname                    string
	Source                   string
	SourceSub                string
	LoginTime                uint32
}

func (this *ReqRoleCreate) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.Uid)
	pack.WriteUint32(this.Uuid)
	pack.WriteUint16(this.Sid)
	pack.WriteUint16(this.Cid)
	pack.WriteString(this.Os)
	pack.WriteString(this.Version)
	pack.WriteString(this.Uname)
	pack.WriteString(this.Source)
	pack.WriteString(this.SourceSub)
	pack.WriteUint32(this.LoginTime)

	return pack.Encode(P_REQ_ROLE_CREATE)
}
