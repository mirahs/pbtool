package proto

import (
	"packet"
)

type ReqChatGm struct {
	Content                  string
}

func (this *ReqChatGm) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteString(this.Content)

	return pack.Encode(P_REQ_CHAT_GM)
}
