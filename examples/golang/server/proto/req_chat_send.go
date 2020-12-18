package proto

import (
	"packet"
)

type ReqChatSend struct {
	Channel                  uint8
	DestUid                  uint32
	Content                  string
}

func ReqChatSendDecode(pack *packet.Packet) *ReqChatSend {
	reqChatSend := &ReqChatSend{}

	reqChatSend.Channel = pack.ReadUint8()
	reqChatSend.DestUid = pack.ReadUint32()
	reqChatSend.Content = pack.ReadString()
	return reqChatSend
}
