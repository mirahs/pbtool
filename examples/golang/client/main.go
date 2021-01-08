package main

import (
	"client/proto"
	"fmt"
	"net"
	"os"
	"packet"
)


func main() {
	println("client connect server begin")
	conn, err := net.Dial("tcp", "127.0.0.1:8888")
	checkError(err)
	println("client connect server success")
	defer conn.Close()

	roleLogin := proto.RoleLogin{Account: "admin", Password: "admin"}
	conn.Write(roleLogin.Encode())
}


func dispatch(packetId uint16, buf []byte) {
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
