package proto

import (
	"packet"
)

type SSceneExit struct {
	Uid                      uint32
}

func (this *SSceneExit) Encode() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.Uid)

	return pack.Encode(uint16(2060))
}

func (this *SSceneExit) EncodeMsg() []byte {
	pack := packet.NewWriteBuff(64)

	pack.WriteUint32(this.Uid)

	return pack.ReadBytes()
}

func SSceneExitDecode(pack *packet.Packet) *SSceneExit {
	sSceneExit := &SSceneExit{}

	sSceneExit.Uid = pack.ReadUint32()
	return sSceneExit
}
