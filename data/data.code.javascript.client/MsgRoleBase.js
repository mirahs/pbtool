module.exports = MsgRoleBase;

var Packet = require('../net/Packet');


var MsgRoleBase = function() {
	this._uid = undefined;
	this._uname = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteUint(this._uid);
		packet.WriteString(this._uname);
		return packet;
	}

	this.Decode(packet) {
		this._uid = packet.ReadUint();
		this._uname = packet.ReadString();
	}

	this.GetBuffer() {
		return this.Encode().GetBuffer();
	}


	this.SetUid(uid) {
		this._uid = uid;
	}
	this.GetUid() {
		return this._uid;
	}

	this.SetUname(uname) {
		this._uname = uname;
	}
	this.GetUname() {
		return this._uname;
	}
}
