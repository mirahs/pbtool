package main

import (
	"encoding/binary"
	"fmt"
	"io"
	"net"
	"packet"
	"server/pb"
)


func main() {
	println("server start begin")

	listener, err := net.Listen("tcp", ":8888")
	if err != nil {
		panic(err)
	}
	defer listener.Close()
	println("server start success")

	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Printf("listener.Accept() error: %s\n", err)
			continue
		}
		println("client connection")

		go handleClient(conn)
	}
}


func handleClient(conn net.Conn) {
	defer conn.Close()

	for {
		headData := make([]byte, 2)
		_, err := io.ReadFull(conn, headData)
		if err != nil {
			fmt.Println("client error:", err)
			return
		}

		bodyLen := binary.BigEndian.Uint16(headData)
		bodyData := make([]byte, bodyLen)
		_, err = io.ReadFull(conn, bodyData)
		if err != nil {
			fmt.Println("client error:", err)
			return
		}

		dispatch(conn, bodyData)
	}
}

func dispatch(conn net.Conn, bodyData []byte) {
	packetIdData := bodyData[:2]
	packetId := binary.BigEndian.Uint16(packetIdData)
	println("packetId:", packetId)

	packetData := bodyData[2:]
	packetInst := packet.NewReadBuff(packetData)

	switch packetId {
	case pb.PRoleLogin:
		roleLogin := pb.RoleLoginDecode(packetInst)
		fmt.Println("roleLogin:", roleLogin)

		goodsItems := []*pb.GoodsItem{{Id: 100, Num: 11}, {Id: 200, Num: 22}}
		roleLoginOk := pb.RoleLoginOk{Uid: 10086, Uname: "erlang", GoodsItem: goodsItems}

		goodsItem := pb.GoodsItem{Id: 300, Num: 33}

		conn.Write(append(roleLoginOk.Encode(), goodsItem.Encode()...))
	default:
		fmt.Println("unknown packetId:", packetId)
	}
}
