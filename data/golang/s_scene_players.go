package proto

import (
	"packet"
)

type SScenePlayers struct {
	Players                  []*MsgScenePlayer
}

func (this *SScenePlayers) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	PlayersCount := uint16(len(this.Players))
	pack.WriteUint16(PlayersCount)
	for i := uint16(0); i < PlayersCount; i++ {
		pack.WriteBytes(this.Players[i].EncodeMsg())
	}

	return pack.Encode(uint16(2050))
}

func (this *SScenePlayers) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	PlayersCount := uint16(len(this.Players))
	pack.WriteUint16(PlayersCount)
	for i := uint16(0); i < PlayersCount; i++ {
		pack.WriteBytes(this.Players[i].EncodeMsg())
	}

	return pack.ReadBytes()
}

func SScenePlayersDecode(pack *packet.Packet) *SScenePlayers {
	sScenePlayers := &SScenePlayers{}

	PlayersCount := pack.ReadUint16()
	for ;PlayersCount > 0; PlayersCount-- {
		sScenePlayers.Players = append(sScenePlayers.Players, MsgScenePlayerDecode(pack))
	}
	return sScenePlayers
}
