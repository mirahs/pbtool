package proto

import (
	"packet"
)

type ChatSend struct {
	Channel                  uint8
	Content                  string
	DestUid                  uint32
}

func (this *ChatSend) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint8(this.Channel)
	pack.WriteString(this.Content)
	if this.DestUid != 0 {
		pack.WriteUint8(1)
		pack.WriteUint32(this.DestUid)
	} else {
		pack.WriteUint8(0)
	}

	return pack.Encode(uint16(2010))
}

func (this *ChatSend) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint8(this.Channel)
	pack.WriteString(this.Content)
	if this.DestUid != 0 {
		pack.WriteUint8(1)
		pack.WriteUint32(this.DestUid)
	} else {
		pack.WriteUint8(0)
	}

	return pack.ReadBytes()
}

func ChatSendDecode(pack *packet.Packet) *ChatSend {
	chatSend := &ChatSend{}

	chatSend.Channel = pack.ReadUint8()
	chatSend.Content = pack.ReadString()
	DestUidFlag := pack.ReadUint8()
	if DestUidFlag == 1 {
		chatSend.DestUid = pack.ReadUint32()
	}
	return chatSend
}
