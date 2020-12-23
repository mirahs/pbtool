package proto

import (
	"packet"
)

type SSceneMove struct {
	SceneRotPos              *MsgSceneRotPos
	Forward                  *MsgSceneVector3
	AniName                  string
	XAxis                    int16
	Uid                      uint32
}

func (this *SSceneMove) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteBytes(this.SceneRotPos.EncodeMsg())
	pack.WriteBytes(this.Forward.EncodeMsg())
	pack.WriteString(this.AniName)
	pack.WriteInt16(this.XAxis)
	pack.WriteUint32(this.Uid)

	return pack.Encode(uint16(2080))
}

func (this *SSceneMove) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteBytes(this.SceneRotPos.EncodeMsg())
	pack.WriteBytes(this.Forward.EncodeMsg())
	pack.WriteString(this.AniName)
	pack.WriteInt16(this.XAxis)
	pack.WriteUint32(this.Uid)

	return pack.ReadBytes()
}

func SSceneMoveDecode(pack *packet.Packet) *SSceneMove {
	sSceneMove := &SSceneMove{}

	sSceneMove.SceneRotPos = MsgSceneRotPosDecode(pack)
	sSceneMove.Forward = MsgSceneVector3Decode(pack)
	sSceneMove.AniName = pack.ReadString()
	sSceneMove.XAxis = pack.ReadInt16()
	sSceneMove.Uid = pack.ReadUint32()
	return sSceneMove
}
