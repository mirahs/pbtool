package proto

import (
	"packet"
)

type MsgSceneVector3 struct {
	X                        int16
	Y                        int16
	Z                        int16
}

func (this *MsgSceneVector3) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteInt16(this.X)
	pack.WriteInt16(this.Y)
	pack.WriteInt16(this.Z)

	return pack.ReadBytes()
}

func MsgSceneVector3Decode(pack *packet.Packet) *MsgSceneVector3 {
	msgSceneVector3 := &MsgSceneVector3{}

	msgSceneVector3.X = pack.ReadInt16()
	msgSceneVector3.Y = pack.ReadInt16()
	msgSceneVector3.Z = pack.ReadInt16()
	return msgSceneVector3
}
