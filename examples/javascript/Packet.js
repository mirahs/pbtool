module.exports = Packet;


function Packet(buffer) {
	this._buffer = buffer ? buffer : new Buffer(100);
	this._offset = 0;


	this.Encode = function() {
		var head = new Buffer(4);
		head.writeUInt16BE(this._buffer.length, 0);
		head.writeUInt16BE(packetId, 2);
		var all = Buffer.concat([head, this._buffer]);
		this._buffer = all;
	}

	this.GetBuffer = function() {
		return this._buffer.slice(0, this._offset);
	}

	this.OffsetReset = function() {
		this._offset = 0;
	}


	this.WriteByte = function(v) {
		this._buffer.writeUInt8BE(v, this._offset);
		this._offset += 1;
	}

	this.WriteSbyte = function(v) {
		this._buffer.writeInt8BE(v, this._offset);
		this._offset += 1;
	}

	this.WriteUshort = function(v) {
		this._buffer.writeUInt16BE(v, this._offset);
		this._offset += 2;
	}

	this.WriteShort = function(v) {
		this._buffer.writeInt16BE(v, this._offset);
		this._offset += 2;
	}

	this.WriteUint = function(v) {
		this._buffer.writeUInt32BE(v, this._offset);
		this._offset += 4;
	}

	this.WriteInt = function(v) {
		this._buffer.writeInt32BE(v, this._offset);
		this._offset += 4;
	}

	this.WriteUlong = function(v) {

	}

	this.WriteLong = function(v) {

	}

	this.WriteFloat = function(v) {
		this._buffer.writeFloatBE(v, this._offset);
		this._offset += 4;
	}

	this.WriteDouble = function(v) {
		this._buffer.writeDoubleBE(v, this._offset);
		this._offset += 8;
	}

	this.WriteString = function(v) {
		var len = Buffer.byteLength(v, 'utf8');
		this.WriteUshort(len);
		this._buffer.write(v, this._offset, 'utf8');
		this._offset += len;
	}

	this.WriteBuffer = function(v) {
		var len = v.length;
		v.copy(this._buffer, this._offset, 0, len);
		this._offset += len;
	}


	this.ReadByte = function() {
		var v = this._buffer.readUInt8BE(this._offset);
		this._offset += 1;
		return v;
	}

	this.ReadSbyte = function() {
		var v = this._buffer.readInt8BE(this._offset);
		this._offset += 1;
		return v;
	}

	this.ReadUshort = function() {
		var v = this._buffer.readUInt16BE(this._offset);
		this._offset += 2;
		return v;
	}

	this.ReadShort = function() {
		var v = this._buffer.readInt16BE(this._offset);
		this._offset += 2;
		return v;
	}

	this.ReadUint = function() {
		var v = this._buffer.readUInt32BE(this._offset);
		this._offset += 4;
		return v;
	}

	this.ReadInt = function() {
		var v = this._buffer.readInt32BE(this._offset);
		this._offset += 4;
		return v;
	}

	this.ReadUlong = function() {

	}

	this.ReadLong = function() {

	}

	this.ReadFloat = function() {
		var v = this._buffer.readFloatBE(this._offset)
		this._offset += 4;
		return v;
	}

	this.ReadDouble = function() {
		var v = this._buffer.readDoubleBE(this._offset)
		this._offset += 8;
		return v;
	}

	this.ReadString = function() {
		var len = this.ReadUshort();
		var v = this._buffer.toString('utf8', this._offset, this._offset + len);
		this._offset += len;
		return v;
	}
}
