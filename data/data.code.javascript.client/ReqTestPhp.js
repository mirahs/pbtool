module.exports = ReqTestPhp;

var Packet = require('../net/Packet');
var MsgTestPhp = require('./MsgTestPhp');


function ReqTestPhp() {
	this._u64 = 0;
	this._strxx = "";
	this._msg_req = 0;
	this._msg_opt_flag = 0;
	this._msg_opt = undefined;
	this._msg_rep = new Array();


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteUlong(this._u64);
		packet.WriteString(this._strxx);
		packet.WriteBuffer(this._msg_req.GetBuffer());
		packet.WriteByte(this._msg_opt_flag);
		if (this._msg_opt_flag == 1)
		{
			packet.WriteBuffer(this._msg_opt.GetBuffer());
		}
		var msg_rep_count = this._msg_rep.length;
		packet.WriteUshort(msg_rep_count);
		for (var i = 0; i < msg_rep_count; i++)
		{
			var xxx = this._msg_rep[i];
			packet.WriteBuffer(xxx.GetBuffer());
		}
		packet.Encode(40060);
		return packet;
	}
}

ReqTestPhp.prototype = {
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
