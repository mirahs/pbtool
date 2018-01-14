module.exports = ReqTestSend;

var Packet = require('../net/Packet');
var Msg = require('./Msg');
var MsgRoleBase = require('./MsgRoleBase');


var ReqTestSend = function() {
	this._id_u8 = 0;
	this._role_base = undefined;
	this._id_f32 = new Array();
	this._id_op_u8_flag = 0;
	this._id_op_u8 = 0;
	this._op_role_base_flag = 0;
	this._op_role_base = undefined;


	this.Encode() {
		var packet = new Packet();
		packet.WriteByte(this._id_u8);
		packet.WriteBuffer(this._role_base.GetBuffer());
		var id_f32_count = this._id_f32.length;
		packet.WriteUshort(id_f32_count);
		for (var i = 0; i < id_f32_count; i++) {
			var xxx = this._id_f32[i];
			packet.WriteFloat(xxx);
		}
		packet.WriteByte(this._id_op_u8_flag);
		if (this._id_op_u8_flag) {
			packet.WriteByte(this._id_op_u8);
		}
		packet.WriteByte(this._op_role_base_flag) {
			packet.WriteByffer(this._op_role_base.GetBuffer());
		}
		packet.Encode(Msg.P_REQ_TEST_SEND);
		return packet;
	}


	this.SetIdU8(val) {
		this._id_u8 = val;
	}

	this.SetRoleBase(val) {
		this._role_base = val;
	}

	this.SetIdF32(val) {
		this._id_f32 = val;
	}

	this.SetIdOpU8(val) {
		this._id_op_u8_flag = 1;
		this._id_op_u8 = val;
	}
	
	this.SetOpRoleBase(val) {
		this._op_role_base_flag = 1;
		this._op_role_base = val;
	}
}
