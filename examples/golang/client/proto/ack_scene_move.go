package proto

import (
	"packet"
)

type AckSceneMove struct {
	SceneRotPos              *MsgSceneRotPos
	Forward                  *MsgSceneVector3
	AniName                  string
	XAxis                    int16
	Uid                      uint32
}

func AckSceneMoveDecode(pack *packet.Packet) *AckSceneMove {
	ackSceneMove := &AckSceneMove{}

	ackSceneMove.SceneRotPos = MsgSceneRotPosDecode(pack)
	ackSceneMove.Forward = MsgSceneVector3Decode(pack)
	ackSceneMove.AniName = pack.ReadString()
	ackSceneMove.XAxis = pack.ReadInt16()
	ackSceneMove.Uid = pack.ReadUint32()
	return ackSceneMove
}
