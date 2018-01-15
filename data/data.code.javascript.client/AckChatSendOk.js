module.exports = AckChatSendOk;

var Packet = require('../net/Packet');


function AckChatSendOk() {
	this._channel = undefined;
	this._uid = undefined;
	this._uname = undefined;
	this._content = undefined;


	this.Decode = function(packet) {
		this._channel = packet.ReadByte();
		this._uid = packet.ReadUint();
		this._uname = packet.ReadString();
		this._content = packet.ReadString();
	}


	this.SetChannel = function(channel) {
		this._channel = channel;
	}
	this.GetChannel= function() {
		return this._channel;
	}

	this.SetUid = function(uid) {
		this._uid = uid;
	}
	this.GetUid= function() {
		return this._uid;
	}

	this.SetUname = function(uname) {
		this._uname = uname;
	}
	this.GetUname= function() {
		return this._uname;
	}

	this.SetContent = function(content) {
		this._content = content;
	}
	this.GetContent= function() {
		return this._content;
	}
}
