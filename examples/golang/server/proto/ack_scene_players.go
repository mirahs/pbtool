package proto

import (
	"packet"
)

type AckScenePlayers struct {
	Players                  []*MsgScenePlayer
}

func (this *AckScenePlayers) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	PlayersCount := uint16(len(this.Players))
	pack.WriteUint16(PlayersCount)
	for i := uint16(0); i < PlayersCount; i++ {
		pack.WriteBytes(this.Players[i].Encode())
	}

	return pack.Encode(P_ACK_SCENE_PLAYERS)
}
