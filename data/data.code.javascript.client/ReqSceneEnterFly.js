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
}

ReqSceneEnterFly.prototype = {
	set MapId(val) {
		this._map_id = val;
	},
	get MapId() {
		return this._map_id;
	},
}
