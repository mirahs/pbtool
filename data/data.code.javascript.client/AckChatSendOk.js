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
		this._channel = channel;
	}
	this.GetChannel() {
		return this._channel;
	}

	this.SetUid(uid) {
		this._uid = uid;
	}
	this.GetUid() {
		return this._uid;
	}

	this.SetUname(uname) {
		this._uname = uname;
	}
	this.GetUname() {
		return this._uname;
	}

	this.SetContent(content) {
		this._content = content;
	}
	this.GetContent() {
		return this._content;
	}
}
