module.exports = MsgTestXX;

var Packet = require('../net/Packet');


var MsgTestXX = function() {
	this._id_u8 = undefined;
	this._id_f32 = new Array();
	this.id_op_u8_flag = 0;
	this._id_op_u8 = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteByte(this._id_u8);
		var id_f32_count = this._id_f32.length;
		packet.WriteUshort(id_f32_count);
		for (var i = 0; i < id_f32_count; i++)
		{
			var xxx = this._id_f32[i];
			packet.WriteFloat(xxx);
		}
		packet.WriteByte(id_op_u8_flag);
		if (this.id_op_u8_flag == 1)
		{
			packet.WriteByte(this._id_op_u8);
		}
		return packet;
	}

	this.Decode(packet) {
		this._id_u8 = packet.ReadByte();
		var id_f32_count = packet.ReadUshort();
		for (var i = 0; i < id_f32_count; i++)
		{
			this._id_f32.push(packet.ReadFloat());
		}
		this. id_op_u8_flag = packet.ReadByte();
		if (this.id_op_u8_flag == 1)
		{
			this._id_op_u8 = packet.ReadByte();
		}
	}

	this.GetBuffer() {
		return this.Encode().GetBuffer();
	}


	this.SetIdU8(id_u8) {
		this.id_u8 = id_u8;
	}
	this.GetIdU8() {
		return this.id_u8;
	}

	this.SetIdF32(id_f32) {
		this.id_f32 = id_f32;
	}
	this.GetIdF32() {
		return this.id_f32;
	}

	this.SetIdOpU8(id_op_u8) {
		this.id_op_u8_flag = 1;
		this.id_op_u8 = id_op_u8;
	}
	this.GetIdOpU8() {
		return this.id_op_u8;
	}
}
