module.exports = MsgSceneVector3;

var Packet = require('../net/Packet');


var MsgSceneVector3 = function() {
	this._x = undefined;
	this._y = undefined;
	this._z = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteShort(this._x);
		packet.WriteShort(this._y);
		packet.WriteShort(this._z);
		return packet;
	}

	this.Decode(packet) {
		this._x = packet.ReadShort();
		this._y = packet.ReadShort();
		this._z = packet.ReadShort();
	}

	this.GetBuffer() {
		return this.Encode().GetBuffer();
	}


	this.SetX(x) {
		this._x = x;
	}
	this.GetX() {
		return this._x;
	}

	this.SetY(y) {
		this._y = y;
	}
	this.GetY() {
		return this._y;
	}

	this.SetZ(z) {
		this._z = z;
	}
	this.GetZ() {
		return this._z;
	}
}
