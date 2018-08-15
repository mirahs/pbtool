module.exports = AckSceneEnter;

var Packet = require('../net/Packet');
var MsgScenePlayer = require('./MsgScenePlayer');


function AckSceneEnter() {
	// 玩家信息
	this._player = 0;


	this.Decode = function(packet) {
		var xx = new MsgScenePlayer();
		xx.Decode(packet);
		this._player = xx;
	}
}

AckSceneEnter.prototype = {
	set Player(val) {
		this._player = val;
	},
	get Player() {
		return this._player;
	},
}
