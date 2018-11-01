package com.data {
	interface Handler {
		caller: any;
		method: Function;
	}


	export class NetMgr {
		private _host: string = '';
		private _port: uint = 0;
		private _socket: WebSocket = null;

		private _handlers: { [packetId: uint]: Handler[] } = {};

		private _bufferLen: uint = 0;
		private _buffer: Byte = null;

		private _caller: any = null;
		private _onopen: Function = null;
		private _onclose: Function = null;
		private _onerror: Function = null;


		public function NetMgr(caller?: any, onopen?: Function, onclose?: Function, onerror?: Function) {
			this._handlers = {};

			this._bufferLen = 0;
			this._buffer = new Byte();
			this._buffer.endian = Byte.BIG_ENDIAN;//设置为大端；

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
			this._buffer.writeArrayBuffer(data, 0);
			// 是否有4个字节的长度(2个字节包体长度，2个字节协议号) while处理粘包
			while (this._bufferLen >= 4) {
				// 包体长度
				var bodyLen: uint = this._buffer.getUint16();
				//console.log('bodyLen: ' + bodyLen);
				// 至少有1个完整包
				if (this._bufferLen >= 4 + bodyLen) {
					// 从第3个字节开始读取2个字节的协议号
					var packetId: uint = this._buffer.getUint16();
					// 包体开始位置从第5个字节开始到整个协议包结束
					// var packetBuffer = this._buffer.slice(4, 4 + bodyLen);
					var packetBuffer: Byte = new Byte();
					packetBuffer.endian = Byte.BIG_ENDIAN;//设置为大端；
					packetBuffer.writeArrayBuffer(this._buffer, 4, 4 + bodyLen);
					packetBuffer.pos = 0;

					// 减去当前协议包后的包体
					var bufferLenTmp = this._bufferLen - (4 + bodyLen);
					this._bufferLen -= 4 + bodyLen;
					var newBuffer = new Byte();
					newBuffer.endian = Byte.BIG_ENDIAN;//设置为大端；
					newBuffer.writeArrayBuffer(this._buffer, 4 + bodyLen, bufferLenTmp);
					newBuffer.pos = 0;

					// 派发协议
					this.dispatch(packetId, packetBuffer);
				}
			}
		}

		private dispatch(packetId: number = 0, packetBuffer: Byte = null): void {
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
