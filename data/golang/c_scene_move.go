package proto

import (
	"packet"
)

type CSceneMove struct {
	SceneRotPos              *MsgSceneRotPos
	Forward                  *MsgSceneVector3
	AniName                  string
	XAxis                    int16
}

func (this *CSceneMove) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteBytes(this.SceneRotPos.EncodeMsg())
	pack.WriteBytes(this.Forward.EncodeMsg())
	pack.WriteString(this.AniName)
	pack.WriteInt16(this.XAxis)

	return pack.Encode(uint16(2030))
}

func (this *CSceneMove) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteBytes(this.SceneRotPos.EncodeMsg())
	pack.WriteBytes(this.Forward.EncodeMsg())
	pack.WriteString(this.AniName)
	pack.WriteInt16(this.XAxis)

	return pack.ReadBytes()
}

func CSceneMoveDecode(pack *packet.Packet) *CSceneMove {
	cSceneMove := &CSceneMove{}

	cSceneMove.SceneRotPos = MsgSceneRotPosDecode(pack)
	cSceneMove.Forward = MsgSceneVector3Decode(pack)
	cSceneMove.AniName = pack.ReadString()
	cSceneMove.XAxis = pack.ReadInt16()
	return cSceneMove
}
