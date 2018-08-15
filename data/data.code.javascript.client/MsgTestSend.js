module.exports = MsgTestSend;

var Packet = require('../net/Packet');
var MsgRoleBase = require('./MsgRoleBase');


function MsgTestSend() {
	this._id_u8 = 0;
	this._role_base = 0;
	this._id_f32 = new Array();
	this._id_op_u8_flag = 0;
	this._id_op_u8 = undefined;
	this._op_role_base_flag = 0;
	this._op_role_base = undefined;


	this.Encode = function() {
		var packet = new Packet();
		packet.WriteByte(this._id_u8);
		packet.WriteBuffer(this._role_base.GetBuffer());
		var id_f32_count = this._id_f32.length;
		packet.WriteUshort(id_f32_count);
		for (var i = 0; i < id_f32_count; i++)
		{
			var xxx = this._id_f32[i];
			packet.WriteFloat(xxx);
		}
		packet.WriteByte(this._id_op_u8_flag);
		if (this._id_op_u8_flag == 1)
		{
			packet.WriteByte(this._id_op_u8);
		}
		packet.WriteByte(this._op_role_base_flag);
		if (this._op_role_base_flag == 1)
		{
			packet.WriteBuffer(this._op_role_base.GetBuffer());
		}
		return packet;
	}

	this.Decode = function(packet) {
		this._id_u8 = packet.ReadByte();
		this._role_base = new MsgRoleBase(packet);
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
			this._op_role_base = new MsgRoleBase(packet);
		}
	}

	this.GetBuffer = function() {
		return this.Encode().GetBuffer();
	}
}

MsgTestSend.prototype = {
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
