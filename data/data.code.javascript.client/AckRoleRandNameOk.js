module.exports = AckRoleRandNameOk;

var Packet = require('../net/Packet');


function AckRoleRandNameOk() {
	this._uname = "";


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
