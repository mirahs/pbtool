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

func (this *AckSceneMove) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteBytes(this.SceneRotPos.Encode())
	pack.WriteBytes(this.Forward.Encode())
	pack.WriteString(this.AniName)
	pack.WriteInt16(this.XAxis)
	pack.WriteUint32(this.Uid)

	return pack.Encode(P_ACK_SCENE_MOVE)
}
