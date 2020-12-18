package proto

import (
	"packet"
)

type AckSceneExit struct {
	Uid                      uint32
}

func (this *AckSceneExit) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.Uid)

	return pack.Encode(P_ACK_SCENE_EXIT)
}
