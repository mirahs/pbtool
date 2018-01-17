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


	this.SetU16 = function(u16) {
		this._u16 = u16;
	}
	this.GetU16= function() {
		return this._u16;
	}
}
