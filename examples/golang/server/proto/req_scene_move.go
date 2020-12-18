package proto

import (
	"packet"
)

type ReqSceneMove struct {
	SceneRotPos              *MsgSceneRotPos
	Forward                  *MsgSceneVector3
	AniName                  string
	XAxis                    int16
}

func ReqSceneMoveDecode(pack *packet.Packet) *ReqSceneMove {
	reqSceneMove := &ReqSceneMove{}

	reqSceneMove.SceneRotPos = MsgSceneRotPosDecode(pack)
	reqSceneMove.Forward = MsgSceneVector3Decode(pack)
	reqSceneMove.AniName = pack.ReadString()
	reqSceneMove.XAxis = pack.ReadInt16()
	return reqSceneMove
}
