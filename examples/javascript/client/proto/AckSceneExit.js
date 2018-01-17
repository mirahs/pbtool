module.exports = AckSceneExit;

var Packet = require('../net/Packet');


function AckSceneExit() {
	this._uid = undefined;


	this.Decode = function(packet) {
		this._uid = packet.ReadUint();
	}


	this.SetUid = function(uid) {
		this._uid = uid;
	}
	this.GetUid= function() {
		return this._uid;
	}
}
