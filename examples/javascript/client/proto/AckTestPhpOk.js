module.exports = AckTestPhpOk;

var Packet = require('../net/Packet');
var MsgTestPhp = require('./MsgTestPhp');


function AckTestPhpOk() {
	this._u64 = undefined;
	this._strxx = undefined;
	this._msg_req = undefined;
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


	this.SetU64 = function(u64) {
		this._u64 = u64;
	}
	this.GetU64= function() {
		return this._u64;
	}

	this.SetStrxx = function(strxx) {
		this._strxx = strxx;
	}
	this.GetStrxx= function() {
		return this._strxx;
	}

	this.SetMsgReq = function(msg_req) {
		this._msg_req = msg_req;
	}
	this.GetMsgReq= function() {
		return this._msg_req;
	}

	this.SetMsgOpt = function(msg_opt) {
		this._msg_opt_flag = 1;
		this._msg_opt = msg_opt;
	}
	this.GetMsgOpt= function() {
		return this._msg_opt;
	}

	this.SetMsgRep = function(msg_rep) {
		this._msg_rep = msg_rep;
	}
	this.GetMsgRep= function() {
		return this._msg_rep;
	}
}
