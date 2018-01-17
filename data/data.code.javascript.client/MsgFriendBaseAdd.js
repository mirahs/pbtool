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


	this.SetUid = function(uid) {
		this._uid = uid;
	}
	this.GetUid= function() {
		return this._uid;
	}

	this.SetUname = function(uname) {
		this._uname = uname;
	}
	this.GetUname= function() {
		return this._uname;
	}
}
