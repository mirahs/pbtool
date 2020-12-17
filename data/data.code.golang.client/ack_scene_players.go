package proto

import (
	"packet"
)

type AckScenePlayers struct {
	Players                  []*MsgScenePlayer
}

func AckScenePlayersDecode(pack *packet.Packet) *AckScenePlayers {
	ackScenePlayers := &AckScenePlayers{}

	PlayersCount := pack.ReadUint16()
	for ;PlayersCount > 0; PlayersCount-- {
		ackScenePlayers.Players = append(ackScenePlayers.Players, MsgScenePlayerDecode(pack))
	}
	return ackScenePlayers
}
