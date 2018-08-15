module.exports = AckTestPhpOk;

var Packet = require('../net/Packet');
var MsgTestPhp = require('./MsgTestPhp');


function AckTestPhpOk() {
	this._u64 = 0;
	this._strxx = "";
	this._msg_req = 0;
	this._msg_opt_flag = 0;
	this._msg_opt = undefined;
	this._msg_rep = new Array();


	this.Decode = function(packet) {
		this._u64 = packet.ReadUlong();
		this._strxx = packet.ReadString();
		this._msg_req = new MsgTestPhp(packet);
		this._msg_opt_flag = packet.ReadByte();
		if (this._msg_opt_flag == 1)
		{
			this._msg_opt = new MsgTestPhp(packet);
		}
		var msg_rep_count = packet.ReadUshort();
		for (var i = 0; i < msg_rep_count; i++)
		{
			this._msg_rep.push(new MsgTestPhp(packet));
		}
	}
}

AckTestPhpOk.prototype = {
	set U64(val) {
		this._u64 = val;
	},
	get U64() {
		return this._u64;
	},

	set Strxx(val) {
		this._strxx = val;
	},
	get Strxx() {
		return this._strxx;
	},

	set MsgReq(val) {
		this._msg_req = val;
	},
	get MsgReq() {
		return this._msg_req;
	},

	set MsgOpt(val) {
		this._msg_opt_flag = 1;
		this._msg_opt = val;
	},
	get MsgOpt() {
		return this._msg_opt;
	},

	set MsgRep(val) {
		this._msg_rep = val;
	},
	get MsgRep() {
		return this._msg_rep;
	},
}
