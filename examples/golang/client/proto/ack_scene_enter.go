package proto

import (
	"packet"
)

type AckSceneEnter struct {
	Player                   *MsgScenePlayer
}

func AckSceneEnterDecode(pack *packet.Packet) *AckSceneEnter {
	ackSceneEnter := &AckSceneEnter{}

	ackSceneEnter.Player = MsgScenePlayerDecode(pack)
	return ackSceneEnter
}
