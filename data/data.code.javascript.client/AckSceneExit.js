module.exports = AckSceneExit;

var Packet = require('../net/Packet');


function AckSceneExit() {
	this._uid = 0;


	this.Decode = function(packet) {
		this._uid = packet.ReadUint();
	}
}

AckSceneExit.prototype = {
	set Uid(val) {
		this._uid = val;
	},
	get Uid() {
		return this._uid;
	},
}
