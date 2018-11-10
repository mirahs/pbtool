package manager {
	import proto.Packet;
	import laya.events.Event;
	import laya.events.EventDispatcher;
	import laya.net.Socket;
	import laya.utils.Byte;
	import laya.utils.Dictionary;

	
	public class NetMgr
	{
		private var _host:String ="";
		private var _port: uint = 0;

		private var _socket:Socket = null;
		private var _handlers:Dictionary;
		
		private var _handlerArr:Vector.<Function>;

		private var  _bufferLen: uint = 0;
		private var _buffer: Byte = null;

		private var _caller: * = null;
		private var _onopen: Function = null;
		private var _onclose: Function = null;
		private var _onerror: Function = null;


		public function NetMgr(caller:*=null, onopen:Function=null, onclose:Function=null, onerror:Function=null) 
		{
			this._handlers = new Dictionary();
			
			this._bufferLen = 0;
			this._buffer = new Byte();
			this._buffer.endian = Byte.BIG_ENDIAN;//设置为大端；

			this._caller = caller;
			this._onopen = onopen;
			this._onclose = onclose;
			this._onerror = onerror;
		}

		//注册
		public function on(packetId:Number,method:Function): void 
		{
			if (!_handlers.get(packetId)) 
			{
				_handlerArr = new Vector.<Function>();
				_handlerArr.push(method);
				_handlers.set(packetId,_handlerArr);
			}
			else 
			{
				_handlerArr = _handlers.get(packetId);
				_handlerArr.push(method);
			}
		}
		
		/**
		 *取消注册 
		 * @param packetId
		 * @param method
		 * 
		 */		
		public function off(packetId:Number,method:Function):void 
		{
			if (!_handlers.get(packetId)) 
			{
				console.log("未注册~~~ "+ packetId);
			}
			else 
			{
				_handlerArr = _handlers.get(packetId);
				var _tempindex:int=-1;
				for (var j:int = 0; j < _handlerArr.length; j++) 
				{
					if (_handlerArr[j] == method) 
					{
						_tempindex = j;
						break;
					}
				}
				if(_tempindex > -1)
				   _handlerArr.splice(_tempindex,1);
			}
		}

		/**
		 *连接 
		 * @param host ip地址
		 * @param port 端口
		 * 
		 */		
		public function connect(host:String ="", port:int = 0): void 
		{
			this._host = host;
			this._port = port;

			this._socket = new Socket();
			this._socket.endian = Byte.BIG_ENDIAN;

			this._socket.connectByUrl("ws://" + this._host + ":" + this._port + '/websocket');

			this._socket.on(Event.OPEN,this,openHandler);
			this._socket.on(Event.MESSAGE,this,receiveHandler);
			this._socket.on(Event.CLOSE,this,closeHandler);
			this._socket.on(Event.ERROR,this,errorHandler);
		}
		
		private function openHandler(event:Object = null):void
		{
			//正确建立连接；
			console.log("连接成功！");
			if (this._caller && this._onopen) 
				this._onopen.apply(this._caller, event);
		}
		
		private function receiveHandler(msg:Object = null):void
		{
			///接收到数据触发函数
			processRecive(msg as ArrayBuffer);
		}
		
		private function processRecive(data:ArrayBuffer): void
		{
			// console.log('data:', data);
			this._bufferLen += data.byteLength;
			// 新收的包加进去
			this._buffer.writeArrayBuffer(data);
			this._buffer.pos = 0;
			// 2个字节表示包体长度
			while (this._bufferLen >= 2) {
				// 包体长度
				var bodyLen: uint = this._buffer.getUint16();
				// console.log('bodyLen: ' + bodyLen);
				// 1个完整包(包括2个字节表示包体长度)
				if (this._bufferLen >= 2 + bodyLen) {
					// 协议号+包体
					var bodyBuffer: Byte = new Byte();
					bodyBuffer.endian = Byte.BIG_ENDIAN;//设置为大端；
					bodyBuffer.writeArrayBuffer(this._buffer.buffer, 2, bodyLen);
					bodyBuffer.pos = 0;
					
					// 减去当前协议包后的包体
					var bufferLenTmp: int = this._bufferLen - (2 + bodyLen);
					this._bufferLen -= 2 + bodyLen;

					var newBuffer: Byte = new Byte();
					newBuffer.endian = Byte.BIG_ENDIAN;//设置为大端；
					newBuffer.writeArrayBuffer(this._buffer.buffer, 2 + bodyLen, bufferLenTmp);
					newBuffer.pos = 0;
					
					this._buffer = newBuffer;
					
					// 派发协议
					this.dispatch(bodyBuffer);
				}
			}
		}
		
		private function dispatch(bodyBuffer: Byte = null): void 
		{
			var packetId: uint = bodyBuffer.getUint16();
			console.log('NetMgr.as packetId: ' + packetId);
			// 包体
			var packetBuffer: Byte = new Byte();
			packetBuffer.endian = Byte.BIG_ENDIAN;//设置为大端；
			packetBuffer.writeArrayBuffer(bodyBuffer.buffer, 2, bodyBuffer.length - 2);
			packetBuffer.pos = 0;

			if (_handlers.get(packetId)) 
			{
				_handlerArr = _handlers.get(packetId);
				for each (var i: Function in _handlerArr) 
				{
					const packet: Packet = new Packet(packetBuffer.buffer);
					i(packetId, packet);
				}
			} else {
				console.log('packetId: ' + packetId + ' 没有注册');
			}
		}
				
		private function closeHandler(e:Object= null):void
		{
			//关闭事件
			console.log('网络链接关闭');
			if (this._caller && this._onclose) 
				this._onclose.apply(this._caller, e);
		}
		private function errorHandler(e:Object = null):void
		{
			//连接出错
			console.log('网络错误 e.message:', e as String);
			if (this._caller && this._onerror) 
				this._onerror.apply(this._caller, e);
		}
		
		
		public function send(packet:Packet): void {
			if (this.isConnect) {
				var bf:ArrayBuffer = packet.Buffer();
				this._socket.send(bf);
				console.log('send packetId:' + packet.packetId);
			} else {
				console.log('网络没链接或断开');
			}
		}
		
		/**
		 *断开连接 
		 */		
		public function disConnect(): void {
			if (this._socket != null) 
			{
				this._socket.close();
				this._socket.cleanSocket();
			}
		}

		/**
		 *是否连接 
		 * @return 
		 * 
		 */		
		public function get isConnect():Boolean 
		{
			return this._socket != null && this._socket.connected;
		}
	}
}
