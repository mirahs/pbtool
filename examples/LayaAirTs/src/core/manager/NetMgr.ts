import ByteBuffer = dcodeIO.ByteBuffer;


namespace core.manager {
	interface Handler {
		caller: any;
		method: Function;
	}


	export class NetMgr {
		private _host: string = '';
		private _port: number = 0;
		private _socket: WebSocket = null;

		private _handlers: { [packetId: number]: Handler[] } = {};

		private _bufferLen: number = 0;
		private _buffer: ByteBuffer = null;

		private _caller: any = null;
		private _onopen: Function = null;
		private _onclose: Function = null;
		private _onerror: Function = null;


		constructor(caller?: any, onopen?: Function, onclose?: Function, onerror?: Function) {
			this._handlers = {};

			this._bufferLen = 0;
			this._buffer = new ByteBuffer();

			this._caller = caller;
			this._onopen = onopen;
			this._onclose = onclose;
			this._onerror = onerror;
		}


		public on(packetId: number, caller: any, method: Function): void {
			if (this._handlers[packetId]) {
				const handlers = this._handlers[packetId];
				const handler: Handler = { caller: caller, method: method };
				handlers.push(handler);
			} else {
				const handlers: Handler[] = [];
				const handler: Handler = { caller: caller, method: method };
				handlers.push(handler);
				this._handlers[packetId] = handlers;
			}
		}

		public off(packetId: number, caller: any, method: Function): void {
			if (this._handlers[packetId]) {
				const handlers: Handler[] = this._handlers[packetId];
				for (let i = handlers.length - 1; i >= 0; i--) {
					let handler: Handler = handlers[i];
					if (handler.caller == caller && handler.method == method) {
						handlers.splice(i, 1);
					}
				}
			} else {
				console.log('packetId: ' + packetId + ' 没有注册');
			}
		}

		public clear(caller: any): void {
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
			return this._socket != null && this._socket.readyState == WebSocket.OPEN;
		}


		private openHandler(ev: any = null): void {
			console.log('网络链接成功');
			if (this._caller && this._onopen) this._onopen.apply(this._caller, ev);
		}
		private receiveHandler(evt: any = null): void {
			this.processRecive(evt.data as ArrayBuffer);
		}
		private closeHandler(ev: any = null): void {
			console.log('网络链接关闭');
			if (this._caller && this._onclose) this._onclose.apply(this._caller, ev);
		}
		private errorHandler(ev: ErrorEvent): void {
			console.log('网络错误 ev.message:', ev.message);
			if (this._caller && this._onerror) this._onerror.apply(this._caller, ev);
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
					const packet = new game.util.Packet(packetBuffer);
					const handler: Handler = handlers[i];
					handler.method.apply(handler.caller, [packetId, packet]);
				}
			} else {
				console.log('packetId: ' + packetId + ' 没有注册');
			}
		}
	}
}
