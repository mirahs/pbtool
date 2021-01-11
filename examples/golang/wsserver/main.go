package main

import (
	"fmt"
	"golang.org/x/net/websocket"
	"io"
	"net/http"
	"os"
	"packet"
	packetutil "packet/util"
	"server/proto"
)


type WSServer struct {
	ListenAddr string
}

func (this *WSServer) start() error {
	http.Handle("/websocket", websocket.Handler(this.handler))
	fmt.Println("begin to listen")
	err := http.ListenAndServe(this.ListenAddr, nil)
	if err != nil {
		fmt.Println("ListenAndServe:", err)
		return err
	}
	fmt.Println("start end")
	return nil
}

func (this *WSServer) handler(conn *websocket.Conn) {
	defer conn.Close()

	fmt.Printf("a new ws conn: %s->%s\n", conn.RemoteAddr().String(), conn.LocalAddr().String())

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
			if buffersLen > headLen {
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


func main(){
	wsServer := &WSServer{
		ListenAddr : "127.0.0.1:8889",
	}
	wsServer.start()
	fmt.Println("------end-------")
}


func dispatch(conn *websocket.Conn, bodyBuff []byte) {
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

		websocket.Message.Send(conn, append(roleLoginOk.Encode(), goodsItem.Encode()...))
	default:
		fmt.Println("unknown packetId:", packetId)
	}
}
