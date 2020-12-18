package proto

import (
	"packet"
)

type AckSceneExit struct {
	Uid                      uint32
}

func AckSceneExitDecode(pack *packet.Packet) *AckSceneExit {
	ackSceneExit := &AckSceneExit{}

	ackSceneExit.Uid = pack.ReadUint32()
	return ackSceneExit
}
