package proto

import (
	"packet"
)

type CSceneEnterFly struct {
	MapId                    uint32
}

func (this *CSceneEnterFly) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.MapId)

	return pack.Encode(uint16(2010))
}

func (this *CSceneEnterFly) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.MapId)

	return pack.ReadBytes()
}

func CSceneEnterFlyDecode(pack *packet.Packet) *CSceneEnterFly {
	cSceneEnterFly := &CSceneEnterFly{}

	cSceneEnterFly.MapId = pack.ReadUint32()
	return cSceneEnterFly
}
