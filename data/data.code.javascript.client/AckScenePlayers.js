module.exports = AckScenePlayers;

var Packet = require('../net/Packet');
var MsgScenePlayer = require('./MsgScenePlayer');


function AckScenePlayers() {
	this._players = new Array();


	this.Decode = function(packet) {
		var players_count = packet.ReadUshort();
		for (var i = 0; i < players_count; i++)
		{
			this._players.push(new MsgScenePlayer(packet));
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
