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

func AckChatSendOkDecode(pack *packet.Packet) *AckChatSendOk {
	ackChatSendOk := &AckChatSendOk{}

	ackChatSendOk.Channel = pack.ReadUint8()
	ackChatSendOk.Uid = pack.ReadUint32()
	ackChatSendOk.Uname = pack.ReadString()
	ackChatSendOk.Content = pack.ReadString()
	return ackChatSendOk
}
