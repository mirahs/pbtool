module.exports = MsgRoleBase;

var Packet = require('../net/Packet');


function MsgRoleBase() {
	// 玩家uid
	this._uid = 0;
	// 玩家昵称
	this._uname = "";


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteUint(this._uid);
		packet.WriteString(this._uname);
		return packet;
	}

	this.Decode = function(packet) {
		this._uid = packet.ReadUint();
		this._uname = packet.ReadString();
	}

	this.GetBuffer = function() {
		return this.Encode().GetBuffer();
	}
}

MsgRoleBase.prototype = {
	set Uid(val) {
		this._uid = val;
	},
	get Uid() {
		return this._uid;
	},

	set Uname(val) {
		this._uname = val;
	},
	get Uname() {
		return this._uname;
	},
}
