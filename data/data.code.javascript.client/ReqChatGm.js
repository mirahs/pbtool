module.exports = ReqChatGm;

var Packet = require('../net/Packet');


function ReqChatGm() {
	this._content = "";


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteString(this._content);
		packet.Encode(Msg.REQ_CHAT_GM);
		return packet;
	}


	this.SetContent = function(content) {
		this._content = content;
	}
	this.GetContent= function() {
		return this._content;
	}
}
