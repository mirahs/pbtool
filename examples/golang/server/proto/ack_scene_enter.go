package proto

import (
	"packet"
)

type AckSceneEnter struct {
	Player                   *MsgScenePlayer
}

func (this *AckSceneEnter) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteBytes(this.Player.Encode())

	return pack.Encode(P_ACK_SCENE_ENTER)
}
