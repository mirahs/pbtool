module.exports = MsgTestXX;

var Packet = require('../net/Packet');


function MsgTestXX() {
	this._id_u8 = 0;
	this._id_f32 = new Array();
	this._id_op_u8_flag = 0;
	this._id_op_u8 = undefined;


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteByte(this._id_u8);
		var id_f32_count = this._id_f32.length;
		packet.WriteUshort(id_f32_count);
		for (var i = 0; i < id_f32_count; i++)
		{
			var xxx = this._id_f32[i];
			packet.WriteFloat(xxx);
		}
		packet.WriteByte(this._id_op_u8_flag);
		if (this._id_op_u8_flag == 1)
		{
			packet.WriteByte(this._id_op_u8);
		}
		return packet;
	}

	this.Decode = function(packet) {
		this._id_u8 = packet.ReadByte();
		var id_f32_count = packet.ReadUshort();
		for (var i = 0; i < id_f32_count; i++)
		{
			this._id_f32.push(packet.ReadFloat());
		}
		this._id_op_u8_flag = packet.ReadByte();
		if (this._id_op_u8_flag == 1)
		{
			this._id_op_u8 = packet.ReadByte();
		}
	}

	this.GetBuffer = function() {
		return this.Encode().GetBuffer();
	}


	this.SetIdU8 = function(id_u8) {
		this._id_u8 = id_u8;
	}
	this.GetIdU8= function() {
		return this._id_u8;
	}

	this.SetIdF32 = function(id_f32) {
		this._id_f32 = id_f32;
	}
	this.GetIdF32= function() {
		return this._id_f32;
	}

	this.SetIdOpU8 = function(id_op_u8) {
		this._id_op_u8_flag = 1;
		this._id_op_u8 = id_op_u8;
	}
	this.GetIdOpU8= function() {
		return this._id_op_u8;
	}
}
