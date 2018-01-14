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
		this.x = x;
	}
	this.GetX() {
		return this.x;
	}

	this.SetY(y) {
		this.y = y;
	}
	this.GetY() {
		return this.y;
	}

	this.SetZ(z) {
		this.z = z;
	}
	this.GetZ() {
		return this.z;
	}
}
