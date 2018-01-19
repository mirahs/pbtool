module.exports = ReqRoleRandName;

var Packet = require('../net/Packet');


function ReqRoleRandName() {


	this.Encode = function() {
		var packet = new Packet();
		packet.Encode(1030);
		return packet;
	}


}
