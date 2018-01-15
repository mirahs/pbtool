module.exports = ReqChatSend;

var Packet = require('../net/Packet');


function ReqChatSend() {
	this._channel = undefined;
	this._dest_uid = undefined;
	this._content = undefined;


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteByte(this._channel);
		packet.WriteUint(this._dest_uid);
		packet.WriteString(this._content);
		packet.Encode(Msg.REQ_CHAT_SEND);
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
