module.exports = MsgSceneRotPos;

var Packet = require('../net/Packet');


function MsgSceneRotPos() {
	// 旋转x
	this._rot_x = 0;
	// 旋转y
	this._rot_y = 0;
	// 旋转z
	this._rot_z = 0;
	// 位置x
	this._pos_x = 0;
	// 位置y
	this._pos_y = 0;
	// 位置z
	this._pos_z = 0;


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteShort(this._rot_x);
		packet.WriteShort(this._rot_y);
		packet.WriteShort(this._rot_z);
		packet.WriteShort(this._pos_x);
		packet.WriteShort(this._pos_y);
		packet.WriteShort(this._pos_z);
		return packet;
	}

	this.Decode = function(packet) {
		this._rot_x = packet.ReadShort();
		this._rot_y = packet.ReadShort();
		this._rot_z = packet.ReadShort();
		this._pos_x = packet.ReadShort();
		this._pos_y = packet.ReadShort();
		this._pos_z = packet.ReadShort();
	}

	this.GetBuffer = function() {
		return this.Encode().GetBuffer();
	}
}

MsgSceneRotPos.prototype = {
	set RotX(val) {
		this._rot_x = val;
	},
	get RotX() {
		return this._rot_x;
	},

	set RotY(val) {
		this._rot_y = val;
	},
	get RotY() {
		return this._rot_y;
	},

	set RotZ(val) {
		this._rot_z = val;
	},
	get RotZ() {
		return this._rot_z;
	},

	set PosX(val) {
		this._pos_x = val;
	},
	get PosX() {
		return this._pos_x;
	},

	set PosY(val) {
		this._pos_y = val;
	},
	get PosY() {
		return this._pos_y;
	},

	set PosZ(val) {
		this._pos_z = val;
	},
	get PosZ() {
		return this._pos_z;
	},
}
