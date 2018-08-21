//import * as ByteBuffer from "bytebuffer";


namespace core.manager {
	export class NetMgr {
		private _host: string = '';
		private _port: number = 0;
		private _socket: WebSocket = null;

		private _handlers: { [packetId: number]: HandlerFunc[] } = {};

		private _bufferLen: number = 0;
		private _buffer: ByteBuffer = null;


		private static _inst: NetMgr = null;
		public static get Inst(): NetMgr {
			return this._inst || (this._inst = new NetMgr());
		}
		private constructor() {
			this._handlers = {};

			this._bufferLen = 0;
			this._buffer = new ByteBuffer();
		}


		public on(packetId: number, handler: HandlerFunc): void {
			if (this._handlers[packetId]) {
				const handlers = this._handlers[packetId];
				handlers.push(handler);
			} else {
				const handlers: HandlerFunc[] = [];
				handlers.push(handler);
				this._handlers[packetId] = handlers;
			}
		}

		public off(packetId: number, handler: HandlerFunc): void {
			if (this._handlers[packetId]) {
				const handlers = this._handlers[packetId];
				let delIdx = -1;
				for (let i = 0; i < handlers.length; i++) {
					if (handlers[i] == handler) {
						delIdx = i;
						break;
					}
				}
				if (delIdx != -1) handlers.splice(delIdx, 1);
			} else {
				console.log('packetId: ' + packetId + ' 没有注册');
			}
		}


		public connect(host: string = '', port: number = 0): void {
			this._host = host;
			this._port = port;
			this._socket = new WebSocket("ws://" + this._host + ":" + this._port + '/websocket');

			this._socket.onopen = this.openHandler;
			this._socket.onclose = this.closeHandler;
			this._socket.onmessage = this.receiveHandler;
			this._socket.onerror = this.errorHandler;
		}

		public disConnect(): void {
			if (this._socket != null && this._socket.readyState != WebSocket.CLOSING) {
				this._socket.close();
			}
		}

		public send(packet: game.util.Packet): void {
			if (this.isConnect) {
				const bf = packet.Buffer();
				this._socket.send(bf);
				console.log('send packetId:' + packet.packetId);
			} else {
				console.log('网络没链接或断开');
			}
		}

		public get isConnect(): boolean {
			return this._socket && this._socket.readyState == WebSocket.OPEN;
		}


		private openHandler(event: any = null): void {
			//cy.EventMgr.Send(cy.AppConst.Event.NetConnectSuccess);
		}
		private receiveHandler(evt: any = null): void {
			this.processRecive(evt.data as ArrayBuffer);
		}
		private closeHandler(e: any = null): void {
			//cy.EventMgr.Send(cy.AppConst.Event.NetDisconnect);
		}
		private errorHandler(e: any = null): void {
			//cy.EventMgr.Send(cy.AppConst.Event.NetError);
		}


		private processRecive(data: ArrayBuffer): void {
			this._bufferLen += data.byteLength;
			// 新收的包加进去
			this._buffer.append(data);
			// 是否有4个字节的长度(2个字节包体长度，2个字节协议号) while处理粘包
			while (this._bufferLen >= 4) {
				// 包体长度
				let bodyLen = this._buffer.readUint16(0);
				//console.log('bodyLen: ' + bodyLen);
				// 至少有1个完整包
				if (this._bufferLen >= 4 + bodyLen) {
					// 从第3个字节开始读取2个字节的协议号
					let packetId = this._buffer.readUint16(2);
					// 包体开始位置从第5个字节开始到整个协议包结束
					let packetBuffer = this._buffer.slice(4, 4 + bodyLen);

					// 这2行代码会报错，所以用下面那段代码，估计是bytebuffer.js没处理好
					// this._buffer = this._buffer.copy(4 + bodyLen, this._bufferLen);
					// this._bufferLen = this._bufferLen - (4 + bodyLen);

					// 减去当前协议包后的包体
					var bufferLenTmp = this._bufferLen - (4 + bodyLen);
					if (bufferLenTmp == 0) {
						this._buffer = new ByteBuffer();// 这里只能为1，不能为0，不然会报错
					} else {
						this._buffer = this._buffer.copy(4 + bodyLen, this._bufferLen);
					}
					this._bufferLen = bufferLenTmp;

					// 派发协议
					this.dispatch(packetId, packetBuffer);
				}
			}
		}

		private dispatch(packetId: number = 0, packetBuffer: ByteBuffer = null): void {
			console.log('packetId: ' + packetId);
			if (this._handlers[packetId]) {
				const handlers = this._handlers[packetId];
				for (let i = 0; i < handlers.length; i++) {
					const packet = new game.util.Packet(packetBuffer);
					handlers[i](packetId, packet);
				}
			} else {
				console.log('packetId: ' + packetId + ' 没有注册');
			}
		}
	}
}


interface HandlerFunc {
	(number, Packet): void;
}
