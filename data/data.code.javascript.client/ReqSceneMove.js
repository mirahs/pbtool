module.exports = ReqSceneMove;

var Packet = require('../net/Packet');
var MsgSceneRotPos = require('./MsgSceneRotPos');
var MsgSceneVector3 = require('./MsgSceneVector3');


function ReqSceneMove() {
	// 旋转和位置信息
	this._scene_rot_pos = 0;
	// 方向向量
	this._forward = 0;
	// 当前动画
	this._ani_name = "";
	// 鼠标左右旋转
	this._x_axis = 0;


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteBuffer(this._scene_rot_pos.GetBuffer());
		packet.WriteBuffer(this._forward.GetBuffer());
		packet.WriteString(this._ani_name);
		packet.WriteShort(this._x_axis);
		packet.Encode(2030);
		return packet;
	}
}

ReqSceneMove.prototype = {
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
}
