package proto

import (
	"packet"
)

type CRoleCreate struct {
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

func (this *CRoleCreate) Encode() []byte {
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

	return pack.Encode(uint16(1020))
}

func (this *CRoleCreate) EncodeMsg() []byte {
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

	return pack.ReadBytes()
}

func CRoleCreateDecode(pack *packet.Packet) *CRoleCreate {
	cRoleCreate := &CRoleCreate{}

	cRoleCreate.Uid = pack.ReadUint32()
	cRoleCreate.Uuid = pack.ReadUint32()
	cRoleCreate.Sid = pack.ReadUint16()
	cRoleCreate.Cid = pack.ReadUint16()
	cRoleCreate.Os = pack.ReadString()
	cRoleCreate.Version = pack.ReadString()
	cRoleCreate.Uname = pack.ReadString()
	cRoleCreate.Source = pack.ReadString()
	cRoleCreate.SourceSub = pack.ReadString()
	cRoleCreate.LoginTime = pack.ReadUint32()
	return cRoleCreate
}
