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

func ReqRoleCreateDecode(pack *packet.Packet) *ReqRoleCreate {
	reqRoleCreate := &ReqRoleCreate{}

	reqRoleCreate.Uid = pack.ReadUint32()
	reqRoleCreate.Uuid = pack.ReadUint32()
	reqRoleCreate.Sid = pack.ReadUint16()
	reqRoleCreate.Cid = pack.ReadUint16()
	reqRoleCreate.Os = pack.ReadString()
	reqRoleCreate.Version = pack.ReadString()
	reqRoleCreate.Uname = pack.ReadString()
	reqRoleCreate.Source = pack.ReadString()
	reqRoleCreate.SourceSub = pack.ReadString()
	reqRoleCreate.LoginTime = pack.ReadUint32()
	return reqRoleCreate
}
