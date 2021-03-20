import GameConfig from "./GameConfig";

import NetMgr from "./game/net/NetMgr";
import EventMgr from "./game/EventMgr";
import { Msg } from "./game/proto/Msg";
import Packet from "./game/net/Packet";
import AckTestXX from "./game/proto/AckTestXX";
import AckTestSendOk from "./game/proto/AckTestSendOk";
import AckTestJsOk from "./game/proto/AckTestJsOk";
import ReqTestXX from "./game/proto/ReqTestXX";
import MsgRoleBase from "./game/proto/MsgRoleBase";
import ReqTestSend from "./game/proto/ReqTestSend";
import ReqTestJs from "./game/proto/ReqTestJs";


class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError(true);

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		//加载IDE指定的场景
		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);


		this.test();
	}
	

	private test(): void {
		EventMgr.inst.on(NetMgr.event.NetConnectSuccess, this.handleEvent, this);

        NetMgr.inst.on(Msg.ACK_TEST_X_X, this.onAckTestXX, this);
        NetMgr.inst.on(Msg.ACK_TEST_SEND_OK, this.onAckTestSendOk, this);
        NetMgr.inst.on(Msg.ACK_TEST_JS_OK, this.onAckTestJsOk, this);

		NetMgr.inst.connect('127.0.0.1', 8080);
	}


	private handleEvent(eventId: number, data: any): void {
        console.log('eventId:', eventId)
        switch (eventId) {
            case NetMgr.event.NetConnectSuccess:
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


//激活启动类
new Main();
