package proto

import (
	"packet"
)

type ReqSceneEnterFly struct {
	MapId                    uint32
}

func (this *ReqSceneEnterFly) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.MapId)

	return pack.Encode(P_REQ_SCENE_ENTER_FLY)
}
