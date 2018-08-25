import NetMgr = core.manager.NetMgr;


class GameMain {
    private _netMgr: NetMgr = null;
    private _xx: string = '123456';


    constructor() {
        Laya.init(600, 400);

        this._netMgr = new NetMgr(this, this.onNetOpen, this.onNetClose, this.onNetError);
        this._netMgr.connect('127.0.0.1', 8080);
    }


    private onNetOpen(): void {
        console.log('网络链接成功');

        this._netMgr.on(proto.Msg.ACK_TEST_X_X, this, this.onAckTestXX);
        this._netMgr.on(proto.Msg.ACK_TEST_SEND_OK, this, this.onAckTestSendOk);

        let reqTestXX: proto.ReqTestXX = new proto.ReqTestXX();
        reqTestXX.id_u8 = 111;
        reqTestXX.id_u16 = 11111;
        reqTestXX.id_u32 = 1111111
        reqTestXX.optional_id_u8 = 222;
        reqTestXX.repeat_id_u8 = [1, 2, 3, 4, 5];
        this._netMgr.send(reqTestXX.Encode());

        const roleBase: proto.MsgRoleBase = new proto.MsgRoleBase();
        roleBase.uid = 110;
        roleBase.uname = 'mirahs 你好';
        const reqTestSend: proto.ReqTestSend = new proto.ReqTestSend();
        reqTestSend.id_u8 = 111;
        reqTestSend.role_base = roleBase;
        reqTestSend.id_f32 = [11.12, 12.23,13.45];
        reqTestSend.id_op_u8 = 123;
        reqTestSend.op_role_base = roleBase;
        this._netMgr.send(reqTestSend.Encode());
    }

    private onNetClose(): void {

    }

    private onNetError(): void {
        
    }


    private onAckTestXX(packetId: number, packet: game.util.Packet): void {
        console.log('packetId:' + packetId);
        const ackTestXX: proto.AckTestXX = new proto.AckTestXX(packet);
        console.log('ackTestXX:', ackTestXX);
    }

    private onAckTestSendOk(packetId: number, packet: game.util.Packet): void {
        console.log('packetId:' + packetId);
        const ackTestSendOk: proto.AckTestSendOk = new proto.AckTestSendOk(packet);
        console.log('ackTestSendOk:', ackTestSendOk);
    }
}


new GameMain();
