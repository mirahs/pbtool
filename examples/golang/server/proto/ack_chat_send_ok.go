package proto

import (
	"packet"
)

type AckChatSendOk struct {
	Channel                  uint8
	Uid                      uint32
	Uname                    string
	Content                  string
}

func (this *AckChatSendOk) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint8(this.Channel)
	pack.WriteUint32(this.Uid)
	pack.WriteString(this.Uname)
	pack.WriteString(this.Content)

	return pack.Encode(P_ACK_CHAT_SEND_OK)
}
