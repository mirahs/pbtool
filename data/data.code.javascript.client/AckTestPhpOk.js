module.exports = AckTestPhpOk;

var Packet = require('../net/Packet');
var MsgTestPhp = require('./MsgTestPhp');


var AckTestPhpOk = function() {
	this._u64 = undefined;
	this._strxx = undefined;
	this._msg_req = undefined;
	this.msg_opt_flag = 0;
	this._msg_opt = undefined;
	this._msg_rep = new Array();


	this.Decode(packet) {
		this._u64 = packet.ReadUlong();
		this._strxx = packet.ReadString();
		this._msg_req = new MsgTestPhp(packet);
		this. msg_opt_flag = packet.ReadByte();
		if (this.msg_opt_flag == 1)
		{
			this._msg_opt = new MsgTestPhp(packet);
		}
		var msg_rep_count = packet.ReadUshort();
		for (var i = 0; i < msg_rep_count; i++)
		{
			this._msg_rep.push(new MsgTestPhp(packet));
		}
	}


	this.SetU64(u64) {
		this.u64 = u64;
	}
	this.GetU64() {
		return this.u64;
	}

	this.SetStrxx(strxx) {
		this.strxx = strxx;
	}
	this.GetStrxx() {
		return this.strxx;
	}

	this.SetMsgReq(msg_req) {
		this.msg_req = msg_req;
	}
	this.GetMsgReq() {
		return this.msg_req;
	}

	this.SetMsgOpt(msg_opt) {
		this.msg_opt_flag = 1;
		this.msg_opt = msg_opt;
	}
	this.GetMsgOpt() {
		return this.msg_opt;
	}

	this.SetMsgRep(msg_rep) {
		this.msg_rep = msg_rep;
	}
	this.GetMsgRep() {
		return this.msg_rep;
	}
}
