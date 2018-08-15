module.exports = AckScenePlayers;

var Packet = require('../net/Packet');
var MsgScenePlayer = require('./MsgScenePlayer');


function AckScenePlayers() {
	// 玩家列表
	this._players = new Array();


	this.Decode = function(packet) {
		var players_count = packet.ReadUshort();
		for (var i = 0; i < players_count; i++)
		{
			 var xx = new MsgScenePlayer();
			 xx.Decode(packet);
			this._players.push(xx);
		}
	}
}

AckScenePlayers.prototype = {
	set Players(val) {
		this._players = val;
	},
	get Players() {
		return this._players;
	},
}
