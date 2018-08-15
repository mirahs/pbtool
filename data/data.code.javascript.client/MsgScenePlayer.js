module.exports = MsgScenePlayer;

var Packet = require('../net/Packet');
var MsgSceneRotPos = require('./MsgSceneRotPos');


function MsgScenePlayer() {
	// 玩家ID
	this._uid = 0;
	// 旋转和位置信息
	this._scene_rot_pos = 0;


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteUint(this._uid);
		packet.WriteBuffer(this._scene_rot_pos.GetBuffer());
		return packet;
	}

	this.Decode = function(packet) {
		this._uid = packet.ReadUint();
		var xx = new MsgSceneRotPos();
		xx.Decode(packet);
		this._scene_rot_pos = xx;
	}

	this.GetBuffer = function() {
		return this.Encode().GetBuffer();
	}
}

MsgScenePlayer.prototype = {
	set Uid(val) {
		this._uid = val;
	},
	get Uid() {
		return this._uid;
	},

	set SceneRotPos(val) {
		this._scene_rot_pos = val;
	},
	get SceneRotPos() {
		return this._scene_rot_pos;
	},
}
