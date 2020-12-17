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

func ReqRoleLoginDecode(pack *packet.Packet) *ReqRoleLogin {
	reqRoleLogin := &ReqRoleLogin{}

	reqRoleLogin.Uid = pack.ReadUint32()
	reqRoleLogin.Uuid = pack.ReadUint32()
	reqRoleLogin.Sid = pack.ReadUint16()
	reqRoleLogin.Cid = pack.ReadUint16()
	reqRoleLogin.LoginTime = pack.ReadUint32()
	reqRoleLogin.Pwd = pack.ReadString()
	reqRoleLogin.Relink = pack.ReadUint8()
	reqRoleLogin.Debug = pack.ReadUint8()
	reqRoleLogin.Os = pack.ReadString()
	reqRoleLogin.Version = pack.ReadString()
	return reqRoleLogin
}
