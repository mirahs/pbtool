module.exports = ReqSceneReqPlayers;

var Packet = require('../net/Packet');


function ReqSceneReqPlayers() {


	this.Encode = function() {
		var packet = new Packet();
		packet.Encode(2070);
		return packet;
	}


}
