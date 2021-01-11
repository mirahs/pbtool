package main

import (
	"client/proto"
	"fmt"
	"io"
	"net"
	"os"
	"packet"
	packetutil "packet/util"
)


func main() {
	println("client connect server begin")
	conn, err := net.Dial("tcp", "127.0.0.1:8888")
	checkError(err)
	println("client connect server success")
	defer conn.Close()

	roleLogin := proto.RoleLogin{Account: "admin", Password: "admin"}
	conn.Write(roleLogin.Encode())


	headLen := 2
	buffers := make([]byte, 51200)
	buffersLen := 0
	buffersTmp := make([]byte, 512)

	for {
		readLen, err := conn.Read(buffersTmp)
		if err != nil {
			if err == io.EOF {
				fmt.Fprintf(os.Stderr, "Server exit: %s\n", conn.RemoteAddr())
			} else {
				fmt.Fprintf(os.Stderr, "Read error: %s\n", err)
			}
			return
		}

		copy(buffers[buffersLen:], buffersTmp[:readLen])
		buffersLen += readLen

		for {
			if buffersLen > headLen {
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


func dispatch(bodyBuff []byte) {
	packetIdBuff := bodyBuff[:2]
	packetId := packetutil.ReadU16(packetIdBuff)
	buf := bodyBuff[2:]

	println("packetId:", packetId)
	packetN := packet.NewReadBuff(buf)
	switch packetId {
	case proto.P_ROLE_LOGIN_OK:
		roleLoginOk := proto.RoleLoginOkDecode(packetN)
		fmt.Println("roleLoginOk:", roleLoginOk)
	case proto.P_GOODS_ITEM:
		goodsItem := proto.GoodsItemDecode(packetN)
		fmt.Println("goodsItem:", goodsItem)
	default:
		fmt.Println("unknown packetId:", packetId)
	}
}


func checkError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, "Fatal error:%s", err)
		os.Exit(1)
	}
}
