module.exports = ReqTestXX;

var Packet = require('../net/Packet');


var ReqTestXX = function() {
	this._id_u8 = undefined;
	this._id_u16 = undefined;
	this._id_u32 = undefined;
	this._repeat_id_u8 = new Array();
	this.optional_id_u8_flag = 0;
	this._optional_id_u8 = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteByte(this._id_u8);
		packet.WriteUshort(this._id_u16);
		packet.WriteUint(this._id_u32);
		var repeat_id_u8_count = this._repeat_id_u8.length;
		packet.WriteUshort(repeat_id_u8_count);
		for (var i = 0; i < repeat_id_u8_count; i++)
		{
			var xxx = this._repeat_id_u8[i];
			packet.WriteByte(xxx);
		}
		packet.WriteByte(optional_id_u8_flag);
		if (this.optional_id_u8_flag == 1)
		{
			packet.WriteByte(this._optional_id_u8);
		}
		packet.Encode(Msg.REQ_TEST_X_X);
		return packet;
	}


	this.SetIdU8(id_u8) {
		this.id_u8 = id_u8;
	}
	this.GetIdU8() {
		return this.id_u8;
	}

	this.SetIdU16(id_u16) {
		this.id_u16 = id_u16;
	}
	this.GetIdU16() {
		return this.id_u16;
	}

	this.SetIdU32(id_u32) {
		this.id_u32 = id_u32;
	}
	this.GetIdU32() {
		return this.id_u32;
	}

	this.SetRepeatIdU8(repeat_id_u8) {
		this.repeat_id_u8 = repeat_id_u8;
	}
	this.GetRepeatIdU8() {
		return this.repeat_id_u8;
	}

	this.SetOptionalIdU8(optional_id_u8) {
		this.optional_id_u8_flag = 1;
		this.optional_id_u8 = optional_id_u8;
	}
	this.GetOptionalIdU8() {
		return this.optional_id_u8;
	}
}
