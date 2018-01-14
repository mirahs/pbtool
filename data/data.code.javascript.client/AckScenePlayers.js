module.exports = AckScenePlayers;

var Packet = require('../net/Packet');
var MsgScenePlayer = require('./MsgScenePlayer');


var AckScenePlayers = function() {
	this._players = new Array();


	this.Decode(packet) {
		var players_count = packet.ReadUshort();
		for (var i = 0; i < players_count; i++)
		{
			this._players.push(new MsgScenePlayer(packet));
		}
	}


	this.SetPlayers(players) {
		this.players = players;
	}
	this.GetPlayers() {
		return this.players;
	}
}
