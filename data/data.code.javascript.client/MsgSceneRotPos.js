module.exports = MsgSceneRotPos;

var Packet = require('../net/Packet');


var MsgSceneRotPos = function() {
	this._rot_x = undefined;
	this._rot_y = undefined;
	this._rot_z = undefined;
	this._pos_x = undefined;
	this._pos_y = undefined;
	this._pos_z = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteShort(this._rot_x);
		packet.WriteShort(this._rot_y);
		packet.WriteShort(this._rot_z);
		packet.WriteShort(this._pos_x);
		packet.WriteShort(this._pos_y);
		packet.WriteShort(this._pos_z);
		return packet;
	}

	this.Decode(packet) {
		this._rot_x = packet.ReadShort();
		this._rot_y = packet.ReadShort();
		this._rot_z = packet.ReadShort();
		this._pos_x = packet.ReadShort();
		this._pos_y = packet.ReadShort();
		this._pos_z = packet.ReadShort();
	}

	this.GetBuffer() {
		return this.Encode().GetBuffer();
	}


	this.SetRotX(rot_x) {
		this._rot_x = rot_x;
	}
	this.GetRotX() {
		return this._rot_x;
	}

	this.SetRotY(rot_y) {
		this._rot_y = rot_y;
	}
	this.GetRotY() {
		return this._rot_y;
	}

	this.SetRotZ(rot_z) {
		this._rot_z = rot_z;
	}
	this.GetRotZ() {
		return this._rot_z;
	}

	this.SetPosX(pos_x) {
		this._pos_x = pos_x;
	}
	this.GetPosX() {
		return this._pos_x;
	}

	this.SetPosY(pos_y) {
		this._pos_y = pos_y;
	}
	this.GetPosY() {
		return this._pos_y;
	}

	this.SetPosZ(pos_z) {
		this._pos_z = pos_z;
	}
	this.GetPosZ() {
		return this._pos_z;
	}
}
