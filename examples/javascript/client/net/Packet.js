module.exports = Packet;

var ByteBuffer = require('bytebuffer');


function Packet(buffer) {
	this._buffer = buffer ? buffer : new ByteBuffer();


	this.Encode = function(packetId) {
		var all = new ByteBuffer(4 + this._buffer.limit);
		all.writeUint16(this._buffer.limit);
		all.writeUint16(packetId);
		this._buffer.reset();
		all.append(this._buffer);
		this._buffer = all;
	}

	this.GetBuffer = function() {
		this.Reset();
		return this._buffer.buffer;
	}

	this.WriteBuffer = function(v) {
		//v.copyTo(this._buffer);
		//v.appendTo(this._buffer);
		this._buffer.append(v);	
	}

	this.Reset = function() {
		this._buffer.reset();
	}


	this.WriteByte = function(v) {
		this._buffer.writeUint8(v);
	}

	this.WriteSbyte = function(v) {
		this._buffer.writeInt8(v);
	}

	this.WriteUshort = function(v) {
		this._buffer.writeUint16(v);
	}

	this.WriteShort = function(v) {
		this._buffer.writeInt16(v);
	}

	this.WriteUint = function(v) {
		this._buffer.writeUint32(v);
	}

	this.WriteInt = function(v) {
		this._buffer.writeInt32(v);
	}

	this.WriteUlong = function(v) {
		this._buffer.writeUint64(v);
	}

	this.WriteLong = function(v) {
		this._buffer.writeInt64(v);
	}

	this.WriteFloat = function(v) {
		this._buffer.writeFloat32(v);
	}

	this.WriteDouble = function(v) {
		this._buffer.writeFloat64(v);
	}

	this.WriteString = function(v) {
		var len = ByteBuffer.calculateUTF8Bytes(v);
		this.WriteUshort(len);
		this._buffer.writeString(v);
	}


	this.ReadByte = function() {
		return this._buffer.readUint8();
	}

	this.ReadSbyte = function() {
		return this._buffer.readInt8();
	}

	this.ReadUshort = function() {
		return this._buffer.readUint16();
	}

	this.ReadShort = function() {
		return this._buffer.readInt16();
	}

	this.ReadUint = function() {
		return this._buffer.readUint32();
	}

	this.ReadInt = function() {
		return this._buffer.readInt32();
	}

	this.ReadUlong = function() {
		return this._buffer.readUint64();
	}

	this.ReadLong = function() {
		return this._buffer.readInt64();
	}

	this.ReadFloat = function() {
		return this._buffer.readFloat32();
	}

	this.ReadDouble = function() {
		return this._buffer.readFloat64();
	}

	this.ReadString = function() {
		var len = this.ReadUshort();
		return this._buffer.readString(len, ByteBuffer.METRICS_BYTES);
	}
}
