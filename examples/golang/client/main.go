package main

import (
	"client/pb"
	"encoding/binary"
	"fmt"
	"io"
	"net"
	"os"
	"packet"
)


func main() {
	println("client connect server begin")

	conn, err := net.Dial("tcp", "127.0.0.1:8888")
	checkError(err)
	defer conn.Close()
	println("client connect server success")

	roleLogin := pb.RoleLogin{Account: "admin", Password: "admin"}
	_, err = conn.Write(roleLogin.Encode())
	checkError(err)

	for {
		headData := make([]byte, 2)
		_, err := io.ReadFull(conn, headData)
		checkError(err)

		bodyLen := binary.BigEndian.Uint16(headData)
		bodyData := make([]byte, bodyLen)
		_, err = io.ReadFull(conn, bodyData)
		checkError(err)

		dispatch(bodyData)
	}
}


func dispatch(bodyData []byte) {
	packetIdData := bodyData[:2]
	packetId := binary.BigEndian.Uint16(packetIdData)
	println("packetId:", packetId)

	packetData := bodyData[2:]
	packetInst := packet.NewReadBuff(packetData)

	switch packetId {
	case pb.P_ROLE_LOGIN_OK:
		roleLoginOk := pb.RoleLoginOkDecode(packetInst)
		fmt.Println("roleLoginOk:", roleLoginOk)
	case pb.P_GOODS_ITEM:
		goodsItem := pb.GoodsItemDecode(packetInst)
		fmt.Println("goodsItem:", goodsItem)
	default:
		fmt.Println("unknown packetId:", packetId)
	}
}

func checkError(err error) {
	if err != nil {
		if err == io.EOF {
			fmt.Println("server exited")
			os.Exit(1)
		} else {
			panic(err)
		}
	}
}
