module.exports = AckTestSendOk;

var Packet = require('../net/Packet');
var MsgRoleBase = require('./MsgRoleBase');


function AckTestSendOk() {
	this._id_u8 = 0;
	this._role_base = 0;
	this._id_f32 = new Array();
	this._id_op_u8_flag = 0;
	this._id_op_u8 = undefined;
	this._op_role_base_flag = 0;
	this._op_role_base = undefined;


	this.Decode = function(packet) {
		this._id_u8 = packet.ReadByte();
		var xx = new MsgRoleBase();
		xx.Decode(packet);
		this._role_base = xx;
		var id_f32_count = packet.ReadUshort();
		for (var i = 0; i < id_f32_count; i++)
		{
			this._id_f32.push(packet.ReadFloat());
		}
		this._id_op_u8_flag = packet.ReadByte();
		if (this._id_op_u8_flag == 1)
		{
			this._id_op_u8 = packet.ReadByte();
		}
		this._op_role_base_flag = packet.ReadByte();
		if (this._op_role_base_flag == 1)
		{
			this._op_role_base = new MsgRoleBase();
			this._op_role_base.Decode(packet);
		}
	}
}

AckTestSendOk.prototype = {
	set IdU8(val) {
		this._id_u8 = val;
	},
	get IdU8() {
		return this._id_u8;
	},

	set RoleBase(val) {
		this._role_base = val;
	},
	get RoleBase() {
		return this._role_base;
	},

	set IdF32(val) {
		this._id_f32 = val;
	},
	get IdF32() {
		return this._id_f32;
	},

	set IdOpU8(val) {
		this._id_op_u8_flag = 1;
		this._id_op_u8 = val;
	},
	get IdOpU8() {
		return this._id_op_u8;
	},

	set OpRoleBase(val) {
		this._op_role_base_flag = 1;
		this._op_role_base = val;
	},
	get OpRoleBase() {
		return this._op_role_base;
	},
}
