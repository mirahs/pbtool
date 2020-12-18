package main

import (
	"fmt"
	"io"
	"net"
	"os"
	"packet"
	packetutil "packet/util"
	"server/proto"
)


func main() {
	listener, err := net.Listen("tcp", ":8888")
	checkError(err)
	defer listener.Close()

	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Fprintf(os.Stderr, "listener.Accept() error: %s", err)
			continue
		}
		go handleClient(conn)
	}
}


func handleClient(conn net.Conn) {
	defer conn.Close()

	headLen := 2
	buffers := make([]byte, 51200)
	buffersLen := 0
	buffersTmp := make([]byte, 512)

	for {
		readLen, err := conn.Read(buffersTmp)
		if err != nil {
			if err == io.EOF {
				fmt.Fprintf(os.Stderr, "Client exit: %s\n", conn.RemoteAddr())
			} else {
				fmt.Fprintf(os.Stderr, "Read error: %s\n", err)
			}
			return
		}

		copy(buffers[buffersLen:], buffersTmp[:readLen])
		buffersLen += readLen

		for {
			if buffersLen >= headLen + 2 {
				bodyLen := int(packetutil.ReadU16(buffers))
				if buffersLen >= headLen + bodyLen {
					bodyBuff := buffers[headLen:bodyLen+headLen]
					buffers = buffers[headLen+bodyLen:]
					buffersLen -= int(bodyLen) + headLen

					dispatch(bodyBuff)
				} else {
					break
				}
			} else {
				break
			}
		}
	}
}

func checkError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, "Fatal error: %s", err)
		os.Exit(1)
	}
}

func dispatch(bodyBuff []byte) {
	packetIdBuff := bodyBuff[:2]
	packetId := packetutil.ReadU16(packetIdBuff)
	println("packetId: ", packetId)
	buf := bodyBuff[2:]
	packet := packet.NewReadBuff(buf)
	switch packetId {
	case proto.P_REQ_TEST_X_X:
		reqTestXX := proto.ReqTestXXDecode(packet)
		fmt.Println("reqTestXX:", reqTestXX)
	case proto.P_REQ_TEST_SEND:
		reqTestSend := proto.ReqTestSendDecode(packet)
		fmt.Println("reqTestXX:", reqTestSend)
		fmt.Println(reqTestSend.OpRoleBase.Uid)
		fmt.Println(reqTestSend.OpRoleBase.Uname)
	default:
		fmt.Println("unknown packetId:", packetId)
	}
}
