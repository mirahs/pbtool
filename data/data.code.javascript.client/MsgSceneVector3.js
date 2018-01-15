module.exports = MsgSceneVector3;

var Packet = require('../net/Packet');


function MsgSceneVector3() {
	this._x = undefined;
	this._y = undefined;
	this._z = undefined;


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteShort(this._x);
		packet.WriteShort(this._y);
		packet.WriteShort(this._z);
		return packet;
	}

	this.Decode = function(packet) {
		this._x = packet.ReadShort();
		this._y = packet.ReadShort();
		this._z = packet.ReadShort();
	}

	this.GetBuffer = function() {
		return this.Encode().GetBuffer();
	}


	this.SetX = function(x) {
		this._x = x;
	}
	this.GetX= function() {
		return this._x;
	}

	this.SetY = function(y) {
		this._y = y;
	}
	this.GetY= function() {
		return this._y;
	}

	this.SetZ = function(z) {
		this._z = z;
	}
	this.GetZ= function() {
		return this._z;
	}
}
