module.exports = ReqSceneEnterFly;

var Packet = require('../net/Packet');


var ReqSceneEnterFly = function() {
	this._map_id = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteUint(this._map_id);
		packet.Encode(Msg.REQ_SCENE_ENTER_FLY);
		return packet;
	}


	this.SetMapId(map_id) {
		this._map_id = map_id;
	}
	this.GetMapId() {
		return this._map_id;
	}
}
