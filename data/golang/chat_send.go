package proto

import (
	"packet"
)

type ChatSend struct {
	Channel                  uint8
	DestUid                  uint32
	Content                  string
}

func (this *ChatSend) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint8(this.Channel)
	pack.WriteUint32(this.DestUid)
	pack.WriteString(this.Content)

	return pack.Encode(uint16(1510))
}

func ChatSendDecode(pack *packet.Packet) *ChatSend {
	chatSend := &ChatSend{}

	chatSend.Channel = pack.ReadUint8()
	chatSend.DestUid = pack.ReadUint32()
	chatSend.Content = pack.ReadString()
	return chatSend
}
