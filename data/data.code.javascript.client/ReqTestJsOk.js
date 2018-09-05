module.exports = ReqTestJsOk;

var Packet = require('../net/Packet');


function ReqTestJsOk() {
	this._u64 = 0;
	this._i64 = 0;


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteUlong(this._u64);
		packet.WriteLong(this._i64);
		packet.Encode(40090);
		return packet;
	}
}

ReqTestJsOk.prototype = {
	set U64(val) {
		this._u64 = val;
	},
	get U64() {
		return this._u64;
	},

	set I64(val) {
		this._i64 = val;
	},
	get I64() {
		return this._i64;
	},
}
