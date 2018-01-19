module.exports = ReqSceneEnterFly;

var Packet = require('../net/Packet');


function ReqSceneEnterFly() {
	this._map_id = 0;


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteUint(this._map_id);
		packet.Encode(2010);
		return packet;
	}


	this.SetMapId = function(map_id) {
		this._map_id = map_id;
	}
	this.GetMapId= function() {
		return this._map_id;
	}
}
