module.exports = MsgTestPhp;

var Packet = require('../net/Packet');


var MsgTestPhp = function() {
	this._u16 = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteUshort(this._u16);
		return packet;
	}

	this.Decode(packet) {
		this._u16 = packet.ReadUshort();
	}

	this.GetBuffer() {
		return this.Encode().GetBuffer();
	}


	this.SetU16(u16) {
		this.u16 = u16;
	}
	this.GetU16() {
		return this.u16;
	}
}
