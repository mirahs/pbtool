module.exports = AckSceneEnter;

var Packet = require('../net/Packet');
var MsgScenePlayer = require('./MsgScenePlayer');


function AckSceneEnter() {
	this._player = 0;


	this.Decode = function(packet) {
		this._player = new MsgScenePlayer(packet);
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
