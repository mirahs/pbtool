package main

import (
	"encoding/binary"
	"fmt"
	"golang.org/x/net/websocket"
	"io"
	"net/http"
	"packet"
	"server/pb"
)


type WSServer struct {
	ListenAddr string
}


func (this *WSServer) start() {
	fmt.Println("begin to listen")

	http.Handle("/websocket", websocket.Handler(this.handler))

	err := http.ListenAndServe(this.ListenAddr, nil)
	if err != nil {
		panic(err)
	}
}

func (this *WSServer) handler(conn *websocket.Conn) {
	defer conn.Close()

	fmt.Printf("a new ws conn: %s->%s\n", conn.RemoteAddr().String(), conn.LocalAddr().String())

	for {
		headData := make([]byte, 2)
		_, err := io.ReadFull(conn, headData)
		if flag := checkNetError(err); !flag {
			return
		}

		bodyLen := binary.BigEndian.Uint16(headData)
		bodyData := make([]byte, bodyLen)
		_, err = io.ReadFull(conn, bodyData)
		if flag := checkNetError(err); !flag {
			return
		}

		dispatch(conn, bodyData)
	}
}


func main() {
	wsServer := &WSServer{
		ListenAddr: "127.0.0.1:8889",
	}
	wsServer.start()

	fmt.Println("------end-------")
}


func dispatch(conn *websocket.Conn, bodyData []byte) {
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

		websocket.Message.Send(conn, append(roleLoginOk.Encode(), goodsItem.Encode()...))
	default:
		fmt.Println("unknown packetId:", packetId)
	}
}


func checkNetError(err error) bool {
	if err != nil {
		if err == io.EOF {
			fmt.Println("client exited")
		} else {
			fmt.Println("client error:", err)
		}
		return false
	}
	return true
}
