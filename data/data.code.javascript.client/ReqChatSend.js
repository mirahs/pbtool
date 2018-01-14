module.exports = ReqChatSend;

var Packet = require('../net/Packet');


var ReqChatSend = function() {
	this._channel = undefined;
	this._dest_uid = undefined;
	this._content = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteByte(this._channel);
		packet.WriteUint(this._dest_uid);
		packet.WriteString(this._content);
		packet.Encode(Msg.REQ_CHAT_SEND);
		return packet;
	}


	this.SetChannel(channel) {
		this._channel = channel;
	}
	this.GetChannel() {
		return this._channel;
	}

	this.SetDestUid(dest_uid) {
		this._dest_uid = dest_uid;
	}
	this.GetDestUid() {
		return this._dest_uid;
	}

	this.SetContent(content) {
		this._content = content;
	}
	this.GetContent() {
		return this._content;
	}
}
