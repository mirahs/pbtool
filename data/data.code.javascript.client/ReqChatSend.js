module.exports = ReqChatSend;

var Packet = require('../net/Packet');


function ReqChatSend() {
	// 聊天频道(世界|国家|军团|私聊|系统)
	this._channel = 0;
	// 私聊玩家uid
	this._dest_uid = 0;
	// 聊天内容
	this._content = "";


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteByte(this._channel);
		packet.WriteUint(this._dest_uid);
		packet.WriteString(this._content);
		packet.Encode(1510);
		return packet;
	}
}

ReqChatSend.prototype = {
	set Channel(val) {
		this._channel = val;
	},
	get Channel() {
		return this._channel;
	},

	set DestUid(val) {
		this._dest_uid = val;
	},
	get DestUid() {
		return this._dest_uid;
	},

	set Content(val) {
		this._content = val;
	},
	get Content() {
		return this._content;
	},
}
