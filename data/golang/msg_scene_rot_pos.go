package proto

import (
	"packet"
)

type MsgSceneRotPos struct {
	RotX                     int16
	RotY                     int16
	RotZ                     int16
	PosX                     int16
	PosY                     int16
	PosZ                     int16
}

func (this *MsgSceneRotPos) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteInt16(this.RotX)
	pack.WriteInt16(this.RotY)
	pack.WriteInt16(this.RotZ)
	pack.WriteInt16(this.PosX)
	pack.WriteInt16(this.PosY)
	pack.WriteInt16(this.PosZ)

	return pack.Encode(uint16(0))
}

func (this *MsgSceneRotPos) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteInt16(this.RotX)
	pack.WriteInt16(this.RotY)
	pack.WriteInt16(this.RotZ)
	pack.WriteInt16(this.PosX)
	pack.WriteInt16(this.PosY)
	pack.WriteInt16(this.PosZ)

	return pack.ReadBytes()
}

func MsgSceneRotPosDecode(pack *packet.Packet) *MsgSceneRotPos {
	msgSceneRotPos := &MsgSceneRotPos{}

	msgSceneRotPos.RotX = pack.ReadInt16()
	msgSceneRotPos.RotY = pack.ReadInt16()
	msgSceneRotPos.RotZ = pack.ReadInt16()
	msgSceneRotPos.PosX = pack.ReadInt16()
	msgSceneRotPos.PosY = pack.ReadInt16()
	msgSceneRotPos.PosZ = pack.ReadInt16()
	return msgSceneRotPos
}
