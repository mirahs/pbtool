module.exports = AckTestXX;

var Packet = require('../net/Packet');


function AckTestXX() {
	this._id_u8 = 0;
	this._id_u16 = 0;
	this._id_u32 = 0;
	this._repeat_id_u8 = new Array();
	this._optional_id_u8_flag = 0;
	this._optional_id_u8 = undefined;


	this.Decode = function(packet) {
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
}

AckTestXX.prototype = {
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
