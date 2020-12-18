package proto

import (
	"packet"
)

type MsgScenePlayer struct {
	Uid                      uint32
	SceneRotPos              *MsgSceneRotPos
}

func (this *MsgScenePlayer) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.Uid)
	pack.WriteBytes(this.SceneRotPos.Encode())

	return pack.ReadBytes()
}

func MsgScenePlayerDecode(pack *packet.Packet) *MsgScenePlayer {
	msgScenePlayer := &MsgScenePlayer{}

	msgScenePlayer.Uid = pack.ReadUint32()
	msgScenePlayer.SceneRotPos = MsgSceneRotPosDecode(pack)
	return msgScenePlayer
}
