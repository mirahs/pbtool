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
			//console.log('packetId: ' + packetId);
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
