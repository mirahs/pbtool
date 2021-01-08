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
	println("server start begin")
	listener, err := net.Listen("tcp", ":8888")
	checkError(err)
	println("server start success")
	defer listener.Close()

	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Fprintf(os.Stderr, "listener.Accept() error: %s", err)
			continue
		}
		println("client connection")
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

					dispatch(conn, bodyBuff)
				} else {
					break
				}
			} else {
				break
			}
		}
	}
}

func dispatch(conn net.Conn, bodyBuff []byte) {
	packetIdBuff := bodyBuff[:2]
	packetId := packetutil.ReadU16(packetIdBuff)
	println("packetId: ", packetId)
	buf := bodyBuff[2:]
	packetN := packet.NewReadBuff(buf)
	switch packetId {
	case proto.P_ROLE_LOGIN:
		roleLogin := proto.RoleLoginDecode(packetN)
		fmt.Println("roleLogin:", roleLogin)

		goodsItems := []*proto.GoodsItem{{Id: 100, Num: 11}, {Id: 200, Num: 22}}
		roleLoginOk := proto.RoleLoginOk{Uid: 10086, Uname: "erlang", GoodsItem: goodsItems}

		goodsItem := proto.GoodsItem{Id: 300, Num: 33}

		conn.Write(append(roleLoginOk.Encode(), goodsItem.Encode()...))
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
