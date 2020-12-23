package proto

import (
	"packet"
)

type CSceneEnter struct {
	DoorId                   uint32
}

func (this *CSceneEnter) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.DoorId)

	return pack.Encode(uint16(2020))
}

func (this *CSceneEnter) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.DoorId)

	return pack.ReadBytes()
}

func CSceneEnterDecode(pack *packet.Packet) *CSceneEnter {
	cSceneEnter := &CSceneEnter{}

	cSceneEnter.DoorId = pack.ReadUint32()
	return cSceneEnter
}
