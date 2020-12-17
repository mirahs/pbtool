package main

import (
	"client/proto"
	"fmt"
	"net"
	"os"
	"packet"
)


func main() {
	conn, err := net.Dial("tcp", "127.0.0.1:8888")
	checkError(err)
	defer conn.Close()

	req := proto.ReqTestXX{}
	req.IdU8 = 10
	req.IdU16 = 20
	req.IdU32 = 30
	req.OptionalIdU8 = 60

	conn.Write(req.Encode())

	reqTestSend := proto.ReqTestSend{}
	reqTestSend.IdU8 = 255
	idF32 := []float32{1.23, 1.24}
	reqTestSend.IdF32 = idF32
	reqTestSend.IdOpU8 = 222
	msgRoleBase := &proto.MsgRoleBase{}
	msgRoleBase.Uid = 12306
	msgRoleBase.Uname = "mirahs 你好"
	reqTestSend.RoleBase = msgRoleBase
	reqTestSend.OpRoleBase = msgRoleBase

	//conn.Write(reqTestSend.Encode())
	bytes := reqTestSend.Encode()
	bytes = append(bytes, bytes...)
	conn.Write(bytes)
}


func checkError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, "Fatal error: %s", err)
		os.Exit(1)
	}
}

func do(packetId uint16, buf []byte) {
	println("packetId: ", packetId)
	packet := packet.NewReadBuff(buf)
	switch packetId {
	case proto.P_ACK_TEST_X_X:
		ackTestXX := proto.AckTestXXDecode(packet)
		fmt.Println(ackTestXX)
	default:
		fmt.Println("unknown packetId:", packetId)
	}
}
