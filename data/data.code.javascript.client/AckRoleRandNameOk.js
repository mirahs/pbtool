module.exports = AckRoleRandNameOk;

var Packet = require('../net/Packet');


function AckRoleRandNameOk() {
	this._uname = "";


	this.Decode = function(packet) {
		this._uname = packet.ReadString();
	}
}

AckRoleRandNameOk.prototype = {
	set Uname(val) {
		this._uname = val;
	},
	get Uname() {
		return this._uname;
	},
}
