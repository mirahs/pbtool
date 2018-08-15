module.exports = AckChatSendOk;

var Packet = require('../net/Packet');


function AckChatSendOk() {
	// 聊天频道(世界|国家|军团|私聊|系统)
	this._channel = 0;
	// 玩家uid
	this._uid = 0;
	// 玩家昵称
	this._uname = "";
	// 聊天内容
	this._content = "";


	this.Decode = function(packet) {
		this._channel = packet.ReadByte();
		this._uid = packet.ReadUint();
		this._uname = packet.ReadString();
		this._content = packet.ReadString();
	}
}

AckChatSendOk.prototype = {
	set Channel(val) {
		this._channel = val;
	},
	get Channel() {
		return this._channel;
	},

	set Uid(val) {
		this._uid = val;
	},
	get Uid() {
		return this._uid;
	},

	set Uname(val) {
		this._uname = val;
	},
	get Uname() {
		return this._uname;
	},

	set Content(val) {
		this._content = val;
	},
	get Content() {
		return this._content;
	},
}
