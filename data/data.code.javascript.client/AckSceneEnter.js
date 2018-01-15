module.exports = AckSceneEnter;

var Packet = require('../net/Packet');
var MsgScenePlayer = require('./MsgScenePlayer');


function AckSceneEnter() {
	this._player = undefined;


	this.Decode = function(packet) {
		this._player = new MsgScenePlayer(packet);
	}


	this.SetPlayer = function(player) {
		this._player = player;
	}
	this.GetPlayer= function() {
		return this._player;
	}
}
