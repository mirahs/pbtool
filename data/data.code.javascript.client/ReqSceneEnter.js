module.exports = ReqSceneEnter;

var Packet = require('../net/Packet');


var ReqSceneEnter = function() {
	this._door_id = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteUint(this._door_id);
		packet.Encode(Msg.REQ_SCENE_ENTER);
		return packet;
	}


	this.SetDoorId(door_id) {
		this._door_id = door_id;
	}
	this.GetDoorId() {
		return this._door_id;
	}
}
