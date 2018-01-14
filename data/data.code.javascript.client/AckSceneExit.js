module.exports = AckSceneExit;

var Packet = require('../net/Packet');


var AckSceneExit = function() {
	this._uid = undefined;


	this.Decode(packet) {
		this._uid = packet.ReadUint();
	}


	this.SetUid(uid) {
		this._uid = uid;
	}
	this.GetUid() {
		return this._uid;
	}
}
