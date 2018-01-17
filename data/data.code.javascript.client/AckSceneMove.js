module.exports = AckSceneMove;

var Packet = require('../net/Packet');
var MsgSceneRotPos = require('./MsgSceneRotPos');
var MsgSceneVector3 = require('./MsgSceneVector3');


function AckSceneMove() {
	this._scene_rot_pos = 0;
	this._forward = 0;
	this._ani_name = "";
	this._x_axis = 0;
	this._uid = 0;


	this.Decode = function(packet) {
		this._scene_rot_pos = new MsgSceneRotPos(packet);
		this._forward = new MsgSceneVector3(packet);
		this._ani_name = packet.ReadString();
		this._x_axis = packet.ReadShort();
		this._uid = packet.ReadUint();
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

	this.SetUid = function(uid) {
		this._uid = uid;
	}
	this.GetUid= function() {
		return this._uid;
	}
}
