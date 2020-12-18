package proto

import (
	"packet"
)

type ReqSceneEnter struct {
	DoorId                   uint32
}

func ReqSceneEnterDecode(pack *packet.Packet) *ReqSceneEnter {
	reqSceneEnter := &ReqSceneEnter{}

	reqSceneEnter.DoorId = pack.ReadUint32()
	return reqSceneEnter
}
