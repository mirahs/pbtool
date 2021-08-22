package pb

import (
	"packet"
)

// 请求登录
type RoleLogin struct {
	Account                  string //账号
	Password                 string //密码
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
