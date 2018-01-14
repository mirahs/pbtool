module.exports = AckSceneMove;

var Packet = require('../net/Packet');
var MsgSceneRotPos = require('./MsgSceneRotPos');
var MsgSceneVector3 = require('./MsgSceneVector3');


var AckSceneMove = function() {
	this._scene_rot_pos = undefined;
	this._forward = undefined;
	this._ani_name = undefined;
	this._x_axis = undefined;
	this._uid = undefined;


	this.Decode(packet) {
		this._scene_rot_pos = new MsgSceneRotPos(packet);
		this._forward = new MsgSceneVector3(packet);
		this._ani_name = packet.ReadString();
		this._x_axis = packet.ReadShort();
		this._uid = packet.ReadUint();
	}


	this.SetSceneRotPos(scene_rot_pos) {
		this.scene_rot_pos = scene_rot_pos;
	}
	this.GetSceneRotPos() {
		return this.scene_rot_pos;
	}

	this.SetForward(forward) {
		this.forward = forward;
	}
	this.GetForward() {
		return this.forward;
	}

	this.SetAniName(ani_name) {
		this.ani_name = ani_name;
	}
	this.GetAniName() {
		return this.ani_name;
	}

	this.SetXAxis(x_axis) {
		this.x_axis = x_axis;
	}
	this.GetXAxis() {
		return this.x_axis;
	}

	this.SetUid(uid) {
		this.uid = uid;
	}
	this.GetUid() {
		return this.uid;
	}
}
