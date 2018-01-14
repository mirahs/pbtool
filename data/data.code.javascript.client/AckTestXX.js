module.exports = AckTestXX;

var Packet = require('../net/Packet');


var AckTestXX = function() {
	this._id_u8 = undefined;
	this._id_u16 = undefined;
	this._id_u32 = undefined;
	this._repeat_id_u8 = new Array();
	this._optional_id_u8_flag = 0;
	this._optional_id_u8 = undefined;


	this.Decode(packet) {
		this._id_u8 = packet.ReadByte();
		this._id_u16 = packet.ReadUshort();
		this._id_u32 = packet.ReadUint();
		var repeat_id_u8_count = packet.ReadUshort();
		for (var i = 0; i < repeat_id_u8_count; i++)
		{
			this._repeat_id_u8.push(packet.ReadByte());
		}
		this._optional_id_u8_flag = packet.ReadByte();
		if (this._optional_id_u8_flag == 1)
		{
			this._optional_id_u8 = packet.ReadByte();
		}
	}


	this.SetIdU8(id_u8) {
		this._id_u8 = id_u8;
	}
	this.GetIdU8() {
		return this._id_u8;
	}

	this.SetIdU16(id_u16) {
		this._id_u16 = id_u16;
	}
	this.GetIdU16() {
		return this._id_u16;
	}

	this.SetIdU32(id_u32) {
		this._id_u32 = id_u32;
	}
	this.GetIdU32() {
		return this._id_u32;
	}

	this.SetRepeatIdU8(repeat_id_u8) {
		this._repeat_id_u8 = repeat_id_u8;
	}
	this.GetRepeatIdU8() {
		return this._repeat_id_u8;
	}

	this.SetOptionalIdU8(optional_id_u8) {
		this._optional_id_u8_flag = 1;
		this._optional_id_u8 = optional_id_u8;
	}
	this.GetOptionalIdU8() {
		return this._optional_id_u8;
	}
}
