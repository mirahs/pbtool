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
		this.channel = channel;
	}
	this.GetChannel() {
		return this.channel;
	}

	this.SetDestUid(dest_uid) {
		this.dest_uid = dest_uid;
	}
	this.GetDestUid() {
		return this.dest_uid;
	}

	this.SetContent(content) {
		this.content = content;
	}
	this.GetContent() {
		return this.content;
	}
}
