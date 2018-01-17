module.exports = ReqTestXX;

var Packet = require('../net/Packet');


function ReqTestXX() {
	this._id_u8 = 0;
	this._id_u16 = 0;
	this._id_u32 = 0;
	this._repeat_id_u8 = new Array();
	this._optional_id_u8_flag = 0;
	this._optional_id_u8 = undefined;


	this.Encode = function() {
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
		packet.WriteByte(this._optional_id_u8_flag);
		if (this._optional_id_u8_flag == 1)
		{
			packet.WriteByte(this._optional_id_u8);
		}
		packet.Encode(Msg.REQ_TEST_X_X);
		return packet;
	}


	this.SetIdU8 = function(id_u8) {
		this._id_u8 = id_u8;
	}
	this.GetIdU8= function() {
		return this._id_u8;
	}

	this.SetIdU16 = function(id_u16) {
		this._id_u16 = id_u16;
	}
	this.GetIdU16= function() {
		return this._id_u16;
	}

	this.SetIdU32 = function(id_u32) {
		this._id_u32 = id_u32;
	}
	this.GetIdU32= function() {
		return this._id_u32;
	}

	this.SetRepeatIdU8 = function(repeat_id_u8) {
		this._repeat_id_u8 = repeat_id_u8;
	}
	this.GetRepeatIdU8= function() {
		return this._repeat_id_u8;
	}

	this.SetOptionalIdU8 = function(optional_id_u8) {
		this._optional_id_u8_flag = 1;
		this._optional_id_u8 = optional_id_u8;
	}
	this.GetOptionalIdU8= function() {
		return this._optional_id_u8;
	}
}
