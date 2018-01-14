module.exports = AckRoleLoginOk;

var Packet = require('../net/Packet');


var AckRoleLoginOk = function() {
	this._uname = undefined;


	this.Decode(packet) {
		this._uname = packet.ReadString();
	}


	this.SetUname(uname) {
		this.uname = uname;
	}
	this.GetUname() {
		return this.uname;
	}
}
