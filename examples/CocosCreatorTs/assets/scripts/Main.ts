const { ccclass } = cc._decorator
import { Packet } from '@mi/mod/Packet'
import { Msg } from './proto/Msg'
import { ReqTestXX } from './proto/ReqTestXX'
import { AckTestXX } from './proto/AckTestXX'
import { NetMgr } from '@mi/manager/NetMgr'
import { MsgRoleBase } from './proto/MsgRoleBase'
import { ReqTestSend } from './proto/ReqTestSend'
import { ReqTestJs } from './proto/ReqTestJs'
import { AckTestSendOk } from './proto/AckTestSendOk'
import { AckTestJsOk } from './proto/AckTestJsOk'


@ccclass
export default class NewClass extends cc.Component {
    onLoad() {
        EventMgr.inst.on(AppConst.event.NetConnectSuccess, this, this.handleEvent)

        NetMgr.inst.on(Msg.ACK_TEST_X_X, this, this.onAckTestXX)
        NetMgr.inst.on(Msg.ACK_TEST_SEND_OK, this, this.onAckTestSendOk)
        NetMgr.inst.on(Msg.ACK_TEST_JS_OK, this, this.onAckTestJsOk)
    }

    start() {
        NetMgr.inst.connect('127.0.0.1', 8080)
    }


    private handleEvent(eventId: number, data: any): void {
        console.log('eventId:', eventId)
        switch (eventId) {
            case AppConst.event.NetConnectSuccess:
                let reqTestXX: ReqTestXX = new ReqTestXX();
                reqTestXX.id_u8 = 111;
                reqTestXX.id_u16 = 11111;
                reqTestXX.id_u32 = 1111111
                reqTestXX.optional_id_u8 = 222;
                reqTestXX.repeat_id_u8 = [1, 2, 3, 4, 5];
                NetMgr.inst.send(reqTestXX.Encode());

                const roleBase: MsgRoleBase = new MsgRoleBase();
                roleBase.uid = 110;
                roleBase.uname = 'mirahs 你好';
                const reqTestSend: ReqTestSend = new ReqTestSend();
                reqTestSend.id_u8 = 111;
                reqTestSend.role_base = roleBase;
                reqTestSend.id_f32 = [11.12, 12.23, 13.45];
                reqTestSend.id_op_u8 = 123;
                reqTestSend.op_role_base = roleBase;
                NetMgr.inst.send(reqTestSend.Encode());

                const reqTestJs = new ReqTestJs();
                reqTestJs.u64 = 429496729610086;
                reqTestJs.i64 = -429496729612233;
                NetMgr.inst.send(reqTestJs.Encode());
                break
            default:
                break
        }
    }


    private onAckTestXX(packetId: number, packet: Packet): void {
        console.log('packetId:' + packetId);
        const ackTestXX: AckTestXX = new AckTestXX(packet);
        console.log('ackTestXX:', ackTestXX);
    }

    private onAckTestSendOk(packetId: number, packet: Packet): void {
        console.log('packetId:' + packetId);
        const ackTestSendOk: AckTestSendOk = new AckTestSendOk(packet);
        console.log('ackTestSendOk:', ackTestSendOk);
    }

    private onAckTestJsOk(packetId: number, packet: Packet): void {
        console.log('packetId:' + packetId);
        const ackTestJsOk: AckTestJsOk = new AckTestJsOk(packet);
        console.log('ackTestJsOk:', ackTestJsOk);
    }
}
