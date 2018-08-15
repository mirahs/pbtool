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
}

AckSceneMove.prototype = {
	set SceneRotPos(val) {
		this._scene_rot_pos = val;
	},
	get SceneRotPos() {
		return this._scene_rot_pos;
	},

	set Forward(val) {
		this._forward = val;
	},
	get Forward() {
		return this._forward;
	},

	set AniName(val) {
		this._ani_name = val;
	},
	get AniName() {
		return this._ani_name;
	},

	set XAxis(val) {
		this._x_axis = val;
	},
	get XAxis() {
		return this._x_axis;
	},

	set Uid(val) {
		this._uid = val;
	},
	get Uid() {
		return this._uid;
	},
}
