module.exports = ReqSceneMove;

var Packet = require('../net/Packet');
var MsgSceneRotPos = require('./MsgSceneRotPos');
var MsgSceneVector3 = require('./MsgSceneVector3');


var ReqSceneMove = function() {
	this._scene_rot_pos = undefined;
	this._forward = undefined;
	this._ani_name = undefined;
	this._x_axis = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteBuffer(this._scene_rot_pos.GetBuffer());
		packet.WriteBuffer(this._forward.GetBuffer());
		packet.WriteString(this._ani_name);
		packet.WriteShort(this._x_axis);
		packet.Encode(Msg.REQ_SCENE_MOVE);
		return packet;
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
}
