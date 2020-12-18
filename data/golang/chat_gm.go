package proto

import (
	"packet"
)

type ChatGm struct {
	Content                  string
}

func (this *ChatGm) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteString(this.Content)

	return pack.Encode(P_CHAT_GM)
}

func ChatGmDecode(pack *packet.Packet) *ChatGm {
	chatGm := &ChatGm{}

	chatGm.Content = pack.ReadString()
	return chatGm
}
