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
		this.rot_x = rot_x;
	}
	this.GetRotX() {
		return this.rot_x;
	}

	this.SetRotY(rot_y) {
		this.rot_y = rot_y;
	}
	this.GetRotY() {
		return this.rot_y;
	}

	this.SetRotZ(rot_z) {
		this.rot_z = rot_z;
	}
	this.GetRotZ() {
		return this.rot_z;
	}

	this.SetPosX(pos_x) {
		this.pos_x = pos_x;
	}
	this.GetPosX() {
		return this.pos_x;
	}

	this.SetPosY(pos_y) {
		this.pos_y = pos_y;
	}
	this.GetPosY() {
		return this.pos_y;
	}

	this.SetPosZ(pos_z) {
		this.pos_z = pos_z;
	}
	this.GetPosZ() {
		return this.pos_z;
	}
}
