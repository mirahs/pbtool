package proto

import (
	"packet"
)

type SSceneEnter struct {
	Player                   *MsgScenePlayer
}

func (this *SSceneEnter) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteBytes(this.Player.EncodeMsg())

	return pack.Encode(uint16(2040))
}

func (this *SSceneEnter) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteBytes(this.Player.EncodeMsg())

	return pack.ReadBytes()
}

func SSceneEnterDecode(pack *packet.Packet) *SSceneEnter {
	sSceneEnter := &SSceneEnter{}

	sSceneEnter.Player = MsgScenePlayerDecode(pack)
	return sSceneEnter
}
