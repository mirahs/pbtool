package proto

import (
	"packet"
)

type ReqSceneEnterFly struct {
	MapId                    uint32
}

func ReqSceneEnterFlyDecode(pack *packet.Packet) *ReqSceneEnterFly {
	reqSceneEnterFly := &ReqSceneEnterFly{}

	reqSceneEnterFly.MapId = pack.ReadUint32()
	return reqSceneEnterFly
}
