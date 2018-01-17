module.exports = MsgSceneRotPos;

var Packet = require('../net/Packet');


function MsgSceneRotPos() {
	this._rot_x = 0;
	this._rot_y = 0;
	this._rot_z = 0;
	this._pos_x = 0;
	this._pos_y = 0;
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


	this.SetRotX = function(rot_x) {
		this._rot_x = rot_x;
	}
	this.GetRotX= function() {
		return this._rot_x;
	}

	this.SetRotY = function(rot_y) {
		this._rot_y = rot_y;
	}
	this.GetRotY= function() {
		return this._rot_y;
	}

	this.SetRotZ = function(rot_z) {
		this._rot_z = rot_z;
	}
	this.GetRotZ= function() {
		return this._rot_z;
	}

	this.SetPosX = function(pos_x) {
		this._pos_x = pos_x;
	}
	this.GetPosX= function() {
		return this._pos_x;
	}

	this.SetPosY = function(pos_y) {
		this._pos_y = pos_y;
	}
	this.GetPosY= function() {
		return this._pos_y;
	}

	this.SetPosZ = function(pos_z) {
		this._pos_z = pos_z;
	}
	this.GetPosZ= function() {
		return this._pos_z;
	}
}
