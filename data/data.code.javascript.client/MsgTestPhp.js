module.exports = MsgTestPhp;

var Packet = require('../net/Packet');


function MsgTestPhp() {
	this._u16 = 0;


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteUshort(this._u16);
		return packet;
	}

	this.Decode = function(packet) {
		this._u16 = packet.ReadUshort();
	}

	this.GetBuffer = function() {
		return this.Encode().GetBuffer();
	}
}

MsgTestPhp.prototype = {
	set U16(val) {
		this._u16 = val;
	},
	get U16() {
		return this._u16;
	},
}
