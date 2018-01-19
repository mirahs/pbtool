module.exports = ReqChatSend;

var Packet = require('../net/Packet');


function ReqChatSend() {
	this._channel = 0;
	this._dest_uid = 0;
	this._content = "";


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteByte(this._channel);
		packet.WriteUint(this._dest_uid);
		packet.WriteString(this._content);
		packet.Encode(1510);
		return packet;
	}


	this.SetChannel = function(channel) {
		this._channel = channel;
	}
	this.GetChannel= function() {
		return this._channel;
	}

	this.SetDestUid = function(dest_uid) {
		this._dest_uid = dest_uid;
	}
	this.GetDestUid= function() {
		return this._dest_uid;
	}

	this.SetContent = function(content) {
		this._content = content;
	}
	this.GetContent= function() {
		return this._content;
	}
}
