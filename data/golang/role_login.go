package proto

import (
	"packet"
)

type RoleLogin struct {
	Account                  string
	Password                 string
}

func (this *RoleLogin) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteString(this.Account)
	pack.WriteString(this.Password)

	return pack.Encode(uint16(1010))
}

func (this *RoleLogin) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteString(this.Account)
	pack.WriteString(this.Password)

	return pack.ReadBytes()
}

func RoleLoginDecode(pack *packet.Packet) *RoleLogin {
	roleLogin := &RoleLogin{}

	roleLogin.Account = pack.ReadString()
	roleLogin.Password = pack.ReadString()
	return roleLogin
}
