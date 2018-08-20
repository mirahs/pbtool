namespace net {
	export class Packet {
		private _buffer: ByteBuffer;


		constructor(buffer?: ByteBuffer) {
			this._buffer = buffer ? buffer : new ByteBuffer();
		}


		public Encode(packetId: number) {
			var all = new ByteBuffer(4 + this._buffer.offset);
			all.writeUint16(this._buffer.offset);
			all.writeUint16(packetId);
			all.append(this._buffer.slice(0, this._buffer.offset));
			this._buffer = all;
		}

		public Buffer() {
			return this._buffer.slice(0, this._buffer.offset).buffer
		}

		public GetBuffer(): ByteBuffer {
			return this._buffer;
		}

		public WriteBuffer(v) {
			this._buffer.append(v.slice(0, v.offset));
		}

		public Reset() {
			this._buffer.reset();
		}


		public WriteByte(v) {
			this._buffer.writeUint8(v);
		}

		public WriteSbyte(v) {
			this._buffer.writeInt8(v);
		}

		public WriteUshort(v) {
			this._buffer.writeUint16(v);
		}

		public WriteShort(v) {
			this._buffer.writeInt16(v);
		}

		public WriteUint(v) {
			this._buffer.writeUint32(v);
		}

		public WriteInt(v) {
			this._buffer.writeInt32(v);
		}

		public WriteUlong(v) {
			this._buffer.writeUint64(v);
		}

		public WriteLong(v) {
			this._buffer.writeInt64(v);
		}

		public WriteFloat(v) {
			this._buffer.writeFloat32(v);
		}

		public WriteDouble(v) {
			this._buffer.writeFloat64(v);
		}

		public WriteString(v) {
			var len = ByteBuffer.calculateUTF8Bytes(v);
			this.WriteUshort(len);
			this._buffer.WriteString(v);
		}


		public ReadByte() {
			return this._buffer.readUint8();
		}

		public ReadSbyte() {
			return this._buffer.readInt8();
		}

		public ReadUshort() {
			return this._buffer.readUint16();
		}

		public ReadShort() {
			return this._buffer.readInt16();
		}

		public ReadUint() {
			return this._buffer.readUint32();
		}

		public ReadInt() {
			return this._buffer.readInt32();
		}

		public ReadUlong() {
			return this._buffer.readUint64();
		}

		public ReadLong() {
			return this._buffer.readInt64();
		}

		public ReadFloat() {
			return this._buffer.readFloat32();
		}

		public ReadDouble() {
			return this._buffer.readFloat64();
		}

		public ReadString() {
			var len = this.ReadUshort();
			return this._buffer.readString(len, ByteBuffer.METRICS_BYTES);
		}
	}
}
