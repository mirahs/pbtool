package proto

import (
	"packet"
)

type ReqSceneEnter struct {
	DoorId                   uint32
}

func (this *ReqSceneEnter) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.DoorId)

	return pack.Encode(P_REQ_SCENE_ENTER)
}
