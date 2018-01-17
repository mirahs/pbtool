module.exports = ReqRoleRandName;

var Packet = require('../net/Packet');


function ReqRoleRandName() {


	this.Encode = function() {
		var packet = new Packet();
		packet.Encode(Msg.REQ_ROLE_RAND_NAME);
		return packet;
	}


}
