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

func (this *ReqSceneMove) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteBytes(this.SceneRotPos.Encode())
	pack.WriteBytes(this.Forward.Encode())
	pack.WriteString(this.AniName)
	pack.WriteInt16(this.XAxis)

	return pack.Encode(P_REQ_SCENE_MOVE)
}
