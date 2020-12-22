package proto

import (
	"packet"
)

type ChatSendOk struct {
	Channel                  uint8
	Uid                      uint32
	Uname                    string
	Content                  string
}

func (this *ChatSendOk) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint8(this.Channel)
	pack.WriteUint32(this.Uid)
	pack.WriteString(this.Uname)
	pack.WriteString(this.Content)

	return pack.Encode(uint16(1520))
}

func ChatSendOkDecode(pack *packet.Packet) *ChatSendOk {
	chatSendOk := &ChatSendOk{}

	chatSendOk.Channel = pack.ReadUint8()
	chatSendOk.Uid = pack.ReadUint32()
	chatSendOk.Uname = pack.ReadString()
	chatSendOk.Content = pack.ReadString()
	return chatSendOk
}
