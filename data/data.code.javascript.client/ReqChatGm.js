module.exports = ReqChatGm;

var Packet = require('../net/Packet');


function ReqChatGm() {
	this._content = "";


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteString(this._content);
		packet.Encode(1530);
		return packet;
	}
}

ReqChatGm.prototype = {
	set Content(val) {
		this._content = val;
	},
	get Content() {
		return this._content;
	},
}
