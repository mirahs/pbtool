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


	this.SetPlayers = function(players) {
		this._players = players;
	}
	this.GetPlayers= function() {
		return this._players;
	}
}
