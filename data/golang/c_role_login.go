package proto

import (
	"packet"
)

type CRoleLogin struct {
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

func (this *CRoleLogin) Encode() []byte {
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

	return pack.Encode(uint16(1010))
}

func (this *CRoleLogin) EncodeMsg() []byte {
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

	return pack.ReadBytes()
}

func CRoleLoginDecode(pack *packet.Packet) *CRoleLogin {
	cRoleLogin := &CRoleLogin{}

	cRoleLogin.Uid = pack.ReadUint32()
	cRoleLogin.Uuid = pack.ReadUint32()
	cRoleLogin.Sid = pack.ReadUint16()
	cRoleLogin.Cid = pack.ReadUint16()
	cRoleLogin.LoginTime = pack.ReadUint32()
	cRoleLogin.Pwd = pack.ReadString()
	cRoleLogin.Relink = pack.ReadUint8()
	cRoleLogin.Debug = pack.ReadUint8()
	cRoleLogin.Os = pack.ReadString()
	cRoleLogin.Version = pack.ReadString()
	return cRoleLogin
}
