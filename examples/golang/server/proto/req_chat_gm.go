package proto

import (
	"packet"
)

type ReqChatGm struct {
	Content                  string
}

func ReqChatGmDecode(pack *packet.Packet) *ReqChatGm {
	reqChatGm := &ReqChatGm{}

	reqChatGm.Content = pack.ReadString()
	return reqChatGm
}
