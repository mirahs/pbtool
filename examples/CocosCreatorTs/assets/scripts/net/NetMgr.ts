import EventMgr from "../EventMgr";
import Packet from "./Packet";

const ByteBuffer = require("bytebuffer");


// 协议回调
interface Handler {
    method: Function;
    caller: any;
}


export default class NetMgr {
    private _host: string = '';
    private _port: number = 0;
    private _socket: WebSocket = null;

    private _handlers: { [packetId: number]: Handler[] } = {};

    private _bufferLen: number = 0;
    private _buffer: ByteBuffer = null;

    private static _inst: NetMgr = null;
    public static get inst(): NetMgr { return this._inst || (this._inst = new NetMgr()); }

    // Event事件
    public static readonly event = {
        NetConnectSuccess: 1,   //网络链接成功
        NetConnectFaild: 2,     //网络链接失败
        NetDisconnect: 3,       //网络断开链接
        NetReconnect: 4,        //网络重连
        NetError: 5,            //网络错误
    };


    constructor() {
        this._handlers = {};

        this._bufferLen = 0;
        this._buffer = new ByteBuffer();
    }


    // 协议回调注册
    public on(packetId: number, method: Function, caller?: any): void {
        if (this._handlers[packetId]) {
            const handlers = this._handlers[packetId];
            const handler: Handler = { method: method, caller: caller };
            handlers.push(handler);
        } else {
            const handlers: Handler[] = [];
            const handler: Handler = { method: method, caller: caller };
            handlers.push(handler);
            this._handlers[packetId] = handlers;
        }
    }

    // 协议回调删除
    public off(packetId: number, method: Function, caller?: any): void {
        if (!this._handlers[packetId]) {
            console.error('packetId[' + packetId + ']没有注册');
            return;
        }

        const handlers: Handler[] = this._handlers[packetId];
        for (let i = handlers.length - 1; i >= 0; i--) {
            let handler: Handler = handlers[i];
            if (handler.method == method && handler.caller == caller) {
                handlers.splice(i, 1);
            }
        }
    }

    // 协议回调清除 caller 为空清除所有, 不为空清除对应 caller 回调
    public clear(caller?: any): void {
        if (!caller) {
            this._handlers = {};
            return;
        }

        for (let packetId in this._handlers) {
            const handlers: Handler[] = this._handlers[packetId];
            for (let i = handlers.length - 1; i >= 0; i--) {
                let handler: Handler = handlers[i];
                if (handler.caller == caller) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        }
    }


    public connect(host: string = '', port: number = 0): void {
        this._host = host;
        this._port = port;
        this._socket = new WebSocket("ws://" + this._host + ":" + this._port + '/websocket');
        this._socket.binaryType = "arraybuffer";

        this._socket.onopen = (ev: Event) => { this.openHandler(ev); };
        this._socket.onclose = (ev: Event) => { this.closeHandler(ev); };
        this._socket.onmessage = (ev: Event) => { this.receiveHandler(ev); };
        this._socket.onerror = (ev: ErrorEvent) => { this.errorHandler(ev); };
    }

    // 断开链接
    public disConnect(): void {
        if (this._socket != null && this._socket.readyState != WebSocket.CLOSING) {
            this._socket.close();
        }
    }

    // 发送消息
    public send(packet: Packet): void {
        if (!this.isConnect) {
            console.error('网络没链接或断开');
            return;
        }

        const bf = packet.Buffer();
        this._socket.send(bf);
    }

    // 是否链接服务器
    public get isConnect(): boolean {
        return this._socket != null && this._socket.readyState == WebSocket.OPEN;
    }


    private openHandler(ev: any = null): void {
        console.log('网络链接成功')
        EventMgr.inst.fire(NetMgr.event.NetConnectSuccess)
    }
    private receiveHandler(evt: any = null): void {
        this.processRecive(evt.data as ArrayBuffer)
    }
    private closeHandler(ev: any = null): void {
        console.log('网络链接关闭')
        EventMgr.inst.fire(NetMgr.event.NetDisconnect)
    }
    private errorHandler(ev: ErrorEvent): void {
        console.log('网络错误 ev.message:', ev.message)
        EventMgr.inst.fire(NetMgr.event.NetError)
    }


    private processRecive(data: ArrayBuffer): void {
        //console.log('data:', data);
        this._bufferLen += data.byteLength;
        //console.log('this._bufferLen:', this._bufferLen)
        this._buffer.append(data);
        //console.log('this._buffer:', this._buffer)
        // 2个字节表示包体长度
        while (this._bufferLen >= 2) {
            // 包体长度
            const bodyLen = this._buffer.readUint16(0);
            //console.log('bodyLen:', bodyLen)
            // 1个完整包(包括2个字节表示包体长度)
            if (this._bufferLen >= 2 + bodyLen) {
                // 包体
                const bodyBuffer = this._buffer.copy(2, 2 + bodyLen)

                // 删除1个完整包
                this._buffer = this._buffer.copy(2 + bodyLen, this._bufferLen)
                // 减去1个完整包长度
                this._bufferLen = this._bufferLen - (2 + bodyLen)
                this._buffer = this._bufferLen == 0 ? new ByteBuffer() : this._buffer

                // 派发协议
                this.dispatch(bodyBuffer);
            }
        }
    }

    private dispatch(bodyBuffer: ByteBuffer = null): void {
        const packetId = bodyBuffer.readUint16(0)
        //console.log('packetId:', packetId)
        const packetBuffer = bodyBuffer.slice(2)
        if (this._handlers[packetId]) {
            const handlers = this._handlers[packetId];
            for (let i = 0; i < handlers.length; i++) {
                const packet = new Packet(packetBuffer);
                const handler: Handler = handlers[i];
                handler.method.apply(handler.caller, [packetId, packet]);
            }
        } else {
            console.log('packetId: ' + packetId + ' 没有注册');
        }
    }
}
