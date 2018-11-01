package proto {
	public class Packet {
		public packetId: uint = 0;

		private _byte: Byte;


		public function Packet(buffer: ArrayBuffer = null) {
			this._byte = buffer ? new Byte() : new Byte(buffer);
		}


		public function Encode(packetId: uint) {
			var all = new Byte(4 + this._byte.pos);
			all.writeUint16(this._byte.pos);
			all.writeUint16(packetId);
			all.writeArrayBuffer(this._byte.buffer, 0);
			this._byte = all;
		}

		public function Buffer(): ArrayBuffer {
			// return this._byte.slice(0, this._byte.pos).buffer
			return this._byte.buffer
		}

		public function GetBuffer(): Byte {
			return this._byte;
		}

		public function WriteBuffer(v: Byte) {
			this._byte.writeArrayBuffer(v.buffer, 0);
		}

		public function Reset(): void {
			this._byte.pos = 0;
		}


		public function WriteByte(v: int) {
			this._byte.writeByte(v);
		}

		public function WriteSbyte(v: int) {
			this._byte.writeUint8(v);
		}

		public function WriteUshort(v: int) {
			this._byte.writeUint16(v);
		}

		public function WriteShort(v: int) {
			this._byte.writeInt16(v);
		}

		public function WriteUint(v: int) {
			this._byte.writeUint32(v);
		}

		public function WriteInt(v: int) {
			this._byte.writeInt32(v);
		}

		public function WriteUlong(v: int) {
			this._byte.writeUint64(v);
		}

		public function WriteLong(v: int) {
			this._byte.writeInt64(v);
		}

		public function WriteFloat(v: Number) {
			this._byte.writeFloat32(v);
		}

		public function WriteDouble(v: Number) {
			this._byte.writeFloat64(v);
		}

		public function WriteString(v: String) {
			var len = v.length;
			this.WriteUshort(len);
			this._byte.writeUTFBytes(v);
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

		public function ReadUlong(): int {
			return this._byte.readUint64();
		}

		public function ReadLong(): int {
			return this._byte.readInt64();
		}

		public function ReadFloat(): Number {
			return this._byte.getFloat32();
		}

		public function ReadDouble(): Number {
			return this._byte.getFloat64();
		}

		public function ReadString(): String {
			var len = this.ReadUshort();
			return this._byte.getUTFBytes(len);
		}
	}
}
