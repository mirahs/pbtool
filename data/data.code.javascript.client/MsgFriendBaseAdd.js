module.exports = MsgFriendBaseAdd;

var Packet = require('../net/Packet');


function MsgFriendBaseAdd() {
	this._uid = 0;
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

MsgFriendBaseAdd.prototype = {
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
