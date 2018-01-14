module.exports = AckTestSend;

var Packet = require('../net/Packet');
var MsgRoleBase = require('./MsgRoleBase');


var AckTestSend = function(packet) {
	this._id_u8 = 0;
	this._role_base = undefined;
	this._id_f32 = new Array();
	this._id_op_u8_flag = 0;
	this._id_op_u8 = 0;
	this._op_role_base_flag = 0;
	this._op_role_base = undefined;


	this.Decode(packet) {
		this._id_u8 = packet.ReadByte();
		this._role_base = new MsgRoleBase(packet);
		var id_f32_count = packet.ReadUshort();
		for (var i = 0; i < id_f32_count; i++) {
			this._id_f32.push(packet.ReadFloat());
		}
		this._id_op_u8_flag = packet.ReadByte();
		if (this._id_op_u8_flag) {
			this._id_op_u8 = packet.ReadByte();
		}
		this._op_role_base_flag = packet.ReadByte();
		if (this._op_role_base_flag) {
			this._op_role_base = new MsgRoleBase(packet);
		}
	}


	this.GetIdU8() {
		return this._id_u8;
	}

	this.GetRoleBase() {
		return this._role_base;
	}

	this.GetIdF32() {
		return this._id_f32;
	}

	this.GetIdOpU8() {
		return this._id_op_u8;
	}
	
	this.GetOpRoleBase() {
		return this._op_role_base;
	}
}
