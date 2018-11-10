package {
	import laya.webgl.WebGL;

	import manager.NetMgr;
	import proto.Msg;
	import proto.Packet;


	public class LayaSample {
		private var _netMgr: NetMgr = null;


		public function LayaSample() {
			//初始化引擎
			//Laya.init(1136, 640, WebGL);
            Laya.init(1136, 640);

			this._netMgr = new NetMgr(this, this.onNetOpen, this.onNetClose, this.onNetError);
        	this._netMgr.connect('127.0.0.1', 8080);
		}


		private function onNetOpen(): void {
            console.log('网络链接成功');

            this._netMgr.on(Msg.ACK_TEST_X_X, this.onAckTestXX);
            this._netMgr.on(Msg.ACK_TEST_SEND_OK, this.onAckTestSendOk);
            this._netMgr.on(Msg.ACK_TEST_JS_OK, this.onAckTestJsOk);

            var reqTestXX: proto.ReqTestXX = new proto.ReqTestXX();
            reqTestXX.id_u8 = 111;
            reqTestXX.id_u16 = 11111;
            reqTestXX.id_u32 = 1111111
            reqTestXX.optional_id_u8 = 222;
            reqTestXX.repeat_id_u8 = [1, 2, 3, 4, 5];
            this._netMgr.send(reqTestXX.Encode());

            var roleBase: proto.MsgRoleBase = new proto.MsgRoleBase();
            roleBase.uid = 110;
            roleBase.uname = 'mirahs 你好';
            var reqTestSend: proto.ReqTestSend = new proto.ReqTestSend();
            reqTestSend.id_u8 = 111;
            reqTestSend.role_base = roleBase;
            reqTestSend.id_f32 = [11.12, 12.23,13.45];
            reqTestSend.id_op_u8 = 123;
            reqTestSend.op_role_base = roleBase;
            this._netMgr.send(reqTestSend.Encode());

            var reqTestJs: proto.ReqTestJs = new proto.ReqTestJs();
            reqTestJs.u64 = 429496729610086;
            reqTestJs.i64 = -429496729612233;
            this._netMgr.send(reqTestJs.Encode());
        }

        private function onNetClose(): void {

        }

        private function onNetError(): void {
            
        }


        private function onAckTestXX(packetId: uint, packet: Packet): void {
            console.log('LayaSampel.as packetId:' + packetId);
            const ackTestXX: proto.AckTestXX = new proto.AckTestXX(packet);
            console.log('ackTestXX:', ackTestXX);
        }

        private function onAckTestSendOk(packetId: uint, packet: Packet): void {
            console.log('LayaSampel.as packetId:' + packetId);
            const ackTestSendOk: proto.AckTestSendOk = new proto.AckTestSendOk(packet);
            console.log('ackTestSendOk:', ackTestSendOk);
        }

        private function onAckTestJsOk(packetId: uint, packet: Packet): void {
            console.log('LayaSampel.as packetId:' + packetId);
            const ackTestJsOk: proto.AckTestJsOk = new proto.AckTestJsOk(packet);
            console.log('ackTestJsOk:', ackTestJsOk);
        }
	}
}
