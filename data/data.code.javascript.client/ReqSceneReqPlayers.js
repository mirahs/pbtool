module.exports = ReqSceneReqPlayers;

var Packet = require('../net/Packet');


var ReqSceneReqPlayers = function() {


	this.Encode() {
		var packet = new Packet();
		packet.Encode(Msg.REQ_SCENE_REQ_PLAYERS);
		return packet;
	}


}
