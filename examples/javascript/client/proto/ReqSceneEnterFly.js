module.exports = ReqSceneEnterFly;

var Packet = require('../net/Packet');


function ReqSceneEnterFly() {
	this._map_id = undefined;


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteUint(this._map_id);
		packet.Encode(Msg.REQ_SCENE_ENTER_FLY);
		return packet;
	}


	this.SetMapId = function(map_id) {
		this._map_id = map_id;
	}
	this.GetMapId= function() {
		return this._map_id;
	}
}
