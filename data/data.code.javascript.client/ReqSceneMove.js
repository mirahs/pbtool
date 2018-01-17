module.exports = ReqSceneMove;

var Packet = require('../net/Packet');
var MsgSceneRotPos = require('./MsgSceneRotPos');
var MsgSceneVector3 = require('./MsgSceneVector3');


function ReqSceneMove() {
	this._scene_rot_pos = 0;
	this._forward = 0;
	this._ani_name = "";
	this._x_axis = 0;


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteBuffer(this._scene_rot_pos.GetBuffer());
		packet.WriteBuffer(this._forward.GetBuffer());
		packet.WriteString(this._ani_name);
		packet.WriteShort(this._x_axis);
		packet.Encode(Msg.REQ_SCENE_MOVE);
		return packet;
	}


	this.SetSceneRotPos = function(scene_rot_pos) {
		this._scene_rot_pos = scene_rot_pos;
	}
	this.GetSceneRotPos= function() {
		return this._scene_rot_pos;
	}

	this.SetForward = function(forward) {
		this._forward = forward;
	}
	this.GetForward= function() {
		return this._forward;
	}

	this.SetAniName = function(ani_name) {
		this._ani_name = ani_name;
	}
	this.GetAniName= function() {
		return this._ani_name;
	}

	this.SetXAxis = function(x_axis) {
		this._x_axis = x_axis;
	}
	this.GetXAxis= function() {
		return this._x_axis;
	}
}
