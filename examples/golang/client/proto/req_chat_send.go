package proto

import (
	"packet"
)

type ReqChatSend struct {
	Channel                  uint8
	DestUid                  uint32
	Content                  string
}

func (this *ReqChatSend) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint8(this.Channel)
	pack.WriteUint32(this.DestUid)
	pack.WriteString(this.Content)

	return pack.Encode(P_REQ_CHAT_SEND)
}
