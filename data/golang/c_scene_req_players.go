package proto

import (
	"packet"
)

type CSceneReqPlayers struct {
}

func (this *CSceneReqPlayers) Encode() []byte {
	pack := packet.NewWriteBuff(64)


	return pack.Encode(uint16(2070))
}

func (this *CSceneReqPlayers) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)


	return pack.ReadBytes()
}

func CSceneReqPlayersDecode(pack *packet.Packet) *CSceneReqPlayers {
	cSceneReqPlayers := &CSceneReqPlayers{}

	return cSceneReqPlayers
}
