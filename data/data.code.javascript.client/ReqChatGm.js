module.exports = ReqChatGm;

var Packet = require('../net/Packet');


var ReqChatGm = function() {
	this._content = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteString(this._content);
		packet.Encode(Msg.REQ_CHAT_GM);
		return packet;
	}


	this.SetContent(content) {
		this._content = content;
	}
	this.GetContent() {
		return this._content;
	}
}
