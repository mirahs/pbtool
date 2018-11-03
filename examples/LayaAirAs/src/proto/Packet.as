package proto {
	import laya.utils.Byte;
	

	public class Packet {
		public var packetId: uint = 0;

		private var _byte: Byte;


		public function Packet(buffer: ArrayBuffer = null) {
			this._byte = new Byte(buffer);
			this._byte.pos = 0;
			this._byte.endian = Byte.BIG_ENDIAN;//设置为大端；
		}


		public function Encode(packetId: uint):void 
		{
			this.packetId = packetId;
			var all:Byte = new Byte(4 + this._byte.pos);
			all.endian = Byte.BIG_ENDIAN;//设置为大端；
			all.writeUint16(this._byte.pos);
			all.writeUint16(packetId);
			all.writeArrayBuffer(this._byte.buffer);
			this._byte = all;
		}

		public function Buffer(): ArrayBuffer {
			// return this._byte.slice(0, this._byte.pos).buffer
			return this._byte.buffer
		}

		public function GetBuffer(): Byte {
			return this._byte;
		}

		public function WriteBuffer(v: Byte):void {
			this._byte.writeArrayBuffer(v.buffer, 0);
		}

		public function Reset(): void {
			this._byte.pos = 0;
		}


		public function WriteByte(v: int):void {
			this._byte.writeByte(v);
		}

		public function WriteSbyte(v: int):void {
			this._byte.writeUint8(v);
		}

		public function WriteUshort(v: int):void {
			this._byte.writeUint16(v);
		}

		public function WriteShort(v: int):void {
			this._byte.writeInt16(v);
		}

		public function WriteUint(v: int):void {
			this._byte.writeUint32(v);
		}

		public function WriteInt(v: int):void {
			this._byte.writeInt32(v);
		}

		public function WriteUlong(v: Number):void {
			const zeros:String = "00000000";
		    var str: String = v.toString(16);
		    str = zeros.substr(0, 16 - str.length) + str;
		    this.WriteUint(parseInt(str.substr(0,8),16));
		    this.WriteUint(parseInt(str.substr(8,8),16));
		}

		public function WriteLong(v: Number):void {
			this.WriteUlong(v);
		}

		public function WriteFloat(v: Number):void {
			this._byte.writeFloat32(v);
		}

		public function WriteDouble(v: Number):void {
			this._byte.writeFloat64(v);
		}

		public function WriteString(v: String):void {
			// var len:int = v.length;
			// this.WriteUshort(len);
			// this._byte.writeUTFBytes(v);
			this._byte.writeUTFString(v);
		}


		public function ReadByte(): int {
			return this._byte.getByte();
		}

		public function ReadSbyte(): int {
			return this._byte.getUint8();
		}

		public function ReadUshort(): int {
			return this._byte.getUint16();
		}

		public function ReadShort(): int {
			return this._byte.getInt16();
		}

		public function ReadUint(): int {
			return this._byte.getUint32();
		}

		public function ReadInt(): int {
			return this._byte.getInt32();
		}

		public function ReadUlong(): Number {
			const zeros:String = "00000000";
		    var s:String = this.ReadUint().toString(16);
		    var str:String = zeros.substr(0,8-s.length) + s;
		    s = this.ReadUint().toString(16);
		    str += zeros.substr(0,8-s.length) + s ;
		    return Number(parseInt(str, 16).toString());
		}

		public function ReadLong(): Number {
			return this.ReadUlong();
		}

		public function ReadFloat(): Number {
			return this._byte.getFloat32();
		}

		public function ReadDouble(): Number {
			return this._byte.getFloat64();
		}

		public function ReadString(): String {
			// var len:int = this.ReadUshort();
			// return this._byte.getUTFBytes(len);
			return this._byte.getUTFString();
		}
		
		//Int64转换成ByteArray
		public function writeInt64(bigInt:Number):ArrayBuffer {
			const zeros:String = "00000000";
			var bytes:ArrayBuffer = new ArrayBuffer();
			var str:* = bigInt.toString(16);
			str = zeros.substr(0,16-str.length)+str;
			bytes.writeUnsignedInt(parseInt(str.substr(0,8),16));
			bytes.writeUnsignedInt(parseInt(str.substr(8,8),16));
			bytes.position = 0;
			return bytes;
		}
		
		//ByteArray转换成Int64
		public function readInt64(bytes:ArrayBuffer):Number {
			const zeros:String = "00000000";
			var s:String = bytes.readUnsignedInt().toString(16);
			var str:String = zeros.substr(0,8-s.length) + s;
			s = bytes.readUnsignedInt().toString(16);
			str += zeros.substr(0,8-s.length) + s ;
			return Number(parseInt(str, 16).toString());
		}
	}
}
