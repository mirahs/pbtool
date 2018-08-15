module.exports = AckRoleLoginOk;

var Packet = require('../net/Packet');


function AckRoleLoginOk() {
	// 玩家名字
	this._uname = "";


	this.Decode = function(packet) {
		this._uname = packet.ReadString();
	}
}

AckRoleLoginOk.prototype = {
	set Uname(val) {
		this._uname = val;
	},
	get Uname() {
		return this._uname;
	},
}
