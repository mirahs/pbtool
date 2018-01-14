module.exports = MsgScenePlayer;

var Packet = require('../net/Packet');
var MsgSceneRotPos = require('./MsgSceneRotPos');


var MsgScenePlayer = function() {
	this._uid = undefined;
	this._scene_rot_pos = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteUint(this._uid);
		packet.WriteBuffer(this._scene_rot_pos.GetBuffer());
		return packet;
	}

	this.Decode(packet) {
		this._uid = packet.ReadUint();
		this._scene_rot_pos = new MsgSceneRotPos(packet);
	}

	this.GetBuffer() {
		return this.Encode().GetBuffer();
	}


	this.SetUid(uid) {
		this.uid = uid;
	}
	this.GetUid() {
		return this.uid;
	}

	this.SetSceneRotPos(scene_rot_pos) {
		this.scene_rot_pos = scene_rot_pos;
	}
	this.GetSceneRotPos() {
		return this.scene_rot_pos;
	}
}
