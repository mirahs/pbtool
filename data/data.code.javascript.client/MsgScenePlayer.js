module.exports = MsgScenePlayer;

var Packet = require('../net/Packet');
var MsgSceneRotPos = require('./MsgSceneRotPos');


function MsgScenePlayer() {
	this._uid = 0;
	this._scene_rot_pos = 0;


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteUint(this._uid);
		packet.WriteBuffer(this._scene_rot_pos.GetBuffer());
		return packet;
	}

	this.Decode = function(packet) {
		this._uid = packet.ReadUint();
		this._scene_rot_pos = new MsgSceneRotPos(packet);
	}

	this.GetBuffer = function() {
		return this.Encode().GetBuffer();
	}


	this.SetUid = function(uid) {
		this._uid = uid;
	}
	this.GetUid= function() {
		return this._uid;
	}

	this.SetSceneRotPos = function(scene_rot_pos) {
		this._scene_rot_pos = scene_rot_pos;
	}
	this.GetSceneRotPos= function() {
		return this._scene_rot_pos;
	}
}
