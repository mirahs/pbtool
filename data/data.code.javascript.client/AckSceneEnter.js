module.exports = AckSceneEnter;

var Packet = require('../net/Packet');
var MsgScenePlayer = require('./MsgScenePlayer');


var AckSceneEnter = function() {
	this._player = undefined;


	this.Decode(packet) {
		this._player = new MsgScenePlayer(packet);
	}


	this.SetPlayer(player) {
		this.player = player;
	}
	this.GetPlayer() {
		return this.player;
	}
}
