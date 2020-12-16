package main

import (
	"golang.org/x/net/websocket"
	"fmt"
	"io"
	"os"
	"packet"
	packetutil "packet/util"
	"server/proto"
	"net/http"
)

type WSServer struct {
    ListenAddr string
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
			if buffersLen >= headLen + 2 {
				bodyLen := int(packetutil.ReadU16(buffers))
				if buffersLen >= headLen + bodyLen {
					bodyBuff := buffers[headLen:bodyLen+headLen]
					buffers = buffers[headLen+bodyLen:]
					buffersLen -= int(bodyLen) + headLen

					dispatch(bodyBuff, conn)
				} else {
					break
				}
			} else {
				break
			}
		}
	}
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

func main(){
    wsServer := &WSServer{
        ListenAddr : "127.0.0.1:8080",
    }
    wsServer.start()
    fmt.Println("------end-------")
}


func dispatch(bodyBuff []byte, conn *websocket.Conn) {
	packetIdBuff := bodyBuff[:2]
	packetId := packetutil.ReadU16(packetIdBuff)
	println("packetId: ", packetId)
	buf := bodyBuff[2:]
	packet := packet.NewReadBuff(buf)
	switch packetId {
	case proto.P_REQ_TEST_X_X:
		reqTestXX := proto.ReqTestXXDecode(packet)
		fmt.Println("reqTestXX:", reqTestXX)

		ackTestXX := proto.AckTestXX{}
		ackTestXX.SetIdU8(10)
		ackTestXX.SetIdU16(20)
		ackTestXX.SetIdU32(30)
		ackTestXX.SetOptionalIdU8(60)

		//conn.Write(ackTestXX.Encode())
		websocket.Message.Send(conn, ackTestXX.Encode())
	case proto.P_REQ_TEST_SEND:
		reqTestSend := proto.ReqTestSendDecode(packet)
		fmt.Println("reqTestXX:", reqTestSend)
		fmt.Println(reqTestSend.GetOpRoleBase().GetUid())
		fmt.Println(reqTestSend.GetOpRoleBase().GetUname())

		ackTestSendOk := proto.AckTestSendOk{}
		ackTestSendOk.SetIdU8(255)
		idF32 := []float32{1.23, 1.24}
		ackTestSendOk.SetIdF32(idF32)
		ackTestSendOk.SetIdOpU8(222)
		msgRoleBase := &proto.MsgRoleBase{}
		msgRoleBase.SetUid(12306)
		msgRoleBase.SetUname("mirahs 你好")
		ackTestSendOk.SetRoleBase(msgRoleBase)
		ackTestSendOk.SetOpRoleBase(msgRoleBase)

		bytes := ackTestSendOk.Encode()
		bytes = append(bytes, bytes...)
		//conn.Write(bytes)
		websocket.Message.Send(conn, bytes)
	default:
		fmt.Println("unknown packetId:", packetId)
	}
}
