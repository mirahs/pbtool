import EventMgr from './EventMgr';
import NetMgr from './net/NetMgr';
import Packet from './net/Packet';
import GoodsItem from './proto/GoodsItem';
import { Msg } from './proto/Msg';
import RoleLogin from './proto/RoleLogin';
import RoleLoginOk from './proto/RoleLoginOk';

const { ccclass } = cc._decorator;


@ccclass
export default class NewClass extends cc.Component {
    onLoad() {
        EventMgr.inst.on(NetMgr.event.NetConnectSuccess, this.handleEvent, this);

        NetMgr.inst.on(Msg.ROLE_LOGIN_OK, this.handleNet, this);
        NetMgr.inst.on(Msg.GOODS_ITEM, this.handleNet, this);
    }

    start() {
        NetMgr.inst.connect('127.0.0.1', 8080);
    }


    private handleEvent(eventId: number, data: any): void {
        console.log('eventId:', eventId);
        switch (eventId) {
            case NetMgr.event.NetConnectSuccess:
                const roleLogin = new RoleLogin();
                roleLogin.account = 'admin';
                roleLogin.password = 'admin';
                NetMgr.inst.send(roleLogin.Encode());
                break;
            default:
                break;
        }
    }


    private handleNet(packetId: number, packet: Packet): void {
        console.log('packetId:' + packetId);
        switch (packetId) {
            case Msg.ROLE_LOGIN_OK:
                const roleLoginOk = new RoleLoginOk(packet);
                console.log('roleLoginOk:', roleLoginOk);
                break;
            case Msg.GOODS_ITEM:
                const goodsItem = new GoodsItem(packet);
                console.log('goodsItem:', goodsItem);
                break;
        }
    }
}
