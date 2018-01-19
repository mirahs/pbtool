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


	this.SetDoorId = function(door_id) {
		this._door_id = door_id;
	}
	this.GetDoorId= function() {
		return this._door_id;
	}
}
