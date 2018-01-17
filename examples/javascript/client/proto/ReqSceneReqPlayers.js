module.exports = ReqSceneReqPlayers;

var Packet = require('../net/Packet');


function ReqSceneReqPlayers() {


	this.Encode = function() {
		var packet = new Packet();
		packet.Encode(Msg.REQ_SCENE_REQ_PLAYERS);
		return packet;
	}


}
