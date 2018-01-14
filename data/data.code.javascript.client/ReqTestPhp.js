module.exports = ReqTestPhp;

var Packet = require('../net/Packet');
var MsgTestPhp = require('./MsgTestPhp');


var ReqTestPhp = function() {
	this._u64 = undefined;
	this._strxx = undefined;
	this._msg_req = undefined;
	this.msg_opt_flag = 0;
	this._msg_opt = undefined;
	this._msg_rep = new Array();


	this.Encode() {
		var packet = new Packet();
		packet.WriteUlong(this._u64);
		packet.WriteString(this._strxx);
		packet.WriteBuffer(this._msg_req.GetBuffer());
		packet.WriteByte(msg_opt_flag);
		if (this.msg_opt_flag == 1)
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
		packet.Encode(Msg.REQ_TEST_PHP);
		return packet;
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
