module.exports = ReqChatSend;

var Packet = require('../net/Packet');


function ReqChatSend() {
	this._channel = 0;
	this._dest_uid = 0;
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
