module.exports = MsgSceneVector3;

var Packet = require('../net/Packet');


function MsgSceneVector3() {
	// x
	this._x = 0;
	// y
	this._y = 0;
	// z
	this._z = 0;


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
}

MsgSceneVector3.prototype = {
	set X(val) {
		this._x = val;
	},
	get X() {
		return this._x;
	},

	set Y(val) {
		this._y = val;
	},
	get Y() {
		return this._y;
	},

	set Z(val) {
		this._z = val;
	},
	get Z() {
		return this._z;
	},
}
