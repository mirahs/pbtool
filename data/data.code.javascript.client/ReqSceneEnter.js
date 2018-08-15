module.exports = ReqSceneEnter;

var Packet = require('../net/Packet');


function ReqSceneEnter() {
	this._door_id = 0;


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteUint(this._door_id);
		packet.Encode(2020);
		return packet;
	}
}

ReqSceneEnter.prototype = {
	set DoorId(val) {
		this._door_id = val;
	},
	get DoorId() {
		return this._door_id;
	},
}
