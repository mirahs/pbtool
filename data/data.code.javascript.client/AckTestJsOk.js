module.exports = AckTestJsOk;

var Packet = require('../net/Packet');


function AckTestJsOk() {
	this._u64 = 0;
	this._i64 = 0;


	this.Decode = function(packet) {
		this._u64 = packet.ReadUlong();
		this._i64 = packet.ReadLong();
	}
}

AckTestJsOk.prototype = {
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
