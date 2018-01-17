module.exports = AckRoleLoginOk;

var Packet = require('../net/Packet');


function AckRoleLoginOk() {
	this._uname = undefined;


	this.Decode = function(packet) {
		this._uname = packet.ReadString();
	}


	this.SetUname = function(uname) {
		this._uname = uname;
	}
	this.GetUname= function() {
		return this._uname;
	}
}
