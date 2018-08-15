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
		packet.Encode(40040);
		return packet;
	}
}

ReqTestXX.prototype = {
	set IdU8(val) {
		this._id_u8 = val;
	},
	get IdU8() {
		return this._id_u8;
	},

	set IdU16(val) {
		this._id_u16 = val;
	},
	get IdU16() {
		return this._id_u16;
	},

	set IdU32(val) {
		this._id_u32 = val;
	},
	get IdU32() {
		return this._id_u32;
	},

	set RepeatIdU8(val) {
		this._repeat_id_u8 = val;
	},
	get RepeatIdU8() {
		return this._repeat_id_u8;
	},

	set OptionalIdU8(val) {
		this._optional_id_u8_flag = 1;
		this._optional_id_u8 = val;
	},
	get OptionalIdU8() {
		return this._optional_id_u8;
	},
}
