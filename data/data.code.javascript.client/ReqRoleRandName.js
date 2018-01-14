module.exports = ReqRoleRandName;

var Packet = require('../net/Packet');


var ReqRoleRandName = function() {


	this.Encode() {
		var packet = new Packet();
		packet.Encode(Msg.REQ_ROLE_RAND_NAME);
		return packet;
	}


}
