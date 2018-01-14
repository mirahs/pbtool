module.exports = AckChatSendOk;

var Packet = require('../net/Packet');


var AckChatSendOk = function() {
	this._channel = undefined;
	this._uid = undefined;
	this._uname = undefined;
	this._content = undefined;


	this.Decode(packet) {
		this._channel = packet.ReadByte();
		this._uid = packet.ReadUint();
		this._uname = packet.ReadString();
		this._content = packet.ReadString();
	}


	this.SetChannel(channel) {
		this.channel = channel;
	}
	this.GetChannel() {
		return this.channel;
	}

	this.SetUid(uid) {
		this.uid = uid;
	}
	this.GetUid() {
		return this.uid;
	}

	this.SetUname(uname) {
		this.uname = uname;
	}
	this.GetUname() {
		return this.uname;
	}

	this.SetContent(content) {
		this.content = content;
	}
	this.GetContent() {
		return this.content;
	}
}
