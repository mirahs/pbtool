namespace net {
	export class NetMgr1 {
		private _host: string = '';
		private _port: number = 0;
		private _socket: Laya.Socket = null;

		private _bufferLen: number = 0;
		private _buffer: ByteBuffer = null;


		constructor(host: string = '', port: number = 0) {
			this._socket = new Laya.Socket();
			if (this._socket) {
				this._host = host;
				this._port = port;
				// 大端
				this._socket.endian = Laya.Byte.BIG_ENDIAN;

				this._socket.connectByUrl('ws://' + this._host + ':' + port);

				this._socket.on(Laya.Event.OPEN, this, this.openHandler);
				this._socket.on(Laya.Event.MESSAGE, this, this.receiveHandler);
				this._socket.on(Laya.Event.CLOSE, this, this.closeHandler);
				this._socket.on(Laya.Event.ERROR, this, this.errorHandler);

				this._bufferLen = 0;
				this._buffer = new ByteBuffer();
			}
			else {
				console.error('new Laya.Socket return null');
			}
		}


		private openHandler(event: any = null): void {
			//正确建立连接；
		}
		private receiveHandler(msg: any = null): void {
			///接收到数据触发函数
		}
		private closeHandler(e: any = null): void {
			//关闭事件
		}
		private errorHandler(e: any = null): void {
			//连接出错
		}
	}
}
