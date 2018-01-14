module.exports = MsgTestSend;

var Packet = require('../net/Packet');
var MsgRoleBase = require('./MsgRoleBase');


var MsgTestSend = function() {
	this._id_u8 = undefined;
	this._role_base = undefined;
	this._id_f32 = new Array();
	this.id_op_u8_flag = 0;
	this._id_op_u8 = undefined;
	this.op_role_base_flag = 0;
	this._op_role_base = undefined;


	this.Encode() {
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
		packet.WriteByte(id_op_u8_flag);
		if (this.id_op_u8_flag == 1)
		{
			packet.WriteByte(this._id_op_u8);
		}
		packet.WriteByte(op_role_base_flag);
		if (this.op_role_base_flag == 1)
		{
			packet.WriteBuffer(this._op_role_base.GetBuffer());
		}
		return packet;
	}

	this.Decode(packet) {
		this._id_u8 = packet.ReadByte();
		this._role_base = new MsgRoleBase(packet);
		var id_f32_count = packet.ReadUshort();
		for (var i = 0; i < id_f32_count; i++)
		{
			this._id_f32.push(packet.ReadFloat());
		}
		this. id_op_u8_flag = packet.ReadByte();
		if (this.id_op_u8_flag == 1)
		{
			this._id_op_u8 = packet.ReadByte();
		}
		this. op_role_base_flag = packet.ReadByte();
		if (this.op_role_base_flag == 1)
		{
			this._op_role_base = new MsgRoleBase(packet);
		}
	}

	this.GetBuffer() {
		return this.Encode().GetBuffer();
	}


	this.SetIdU8(id_u8) {
		this.id_u8 = id_u8;
	}
	this.GetIdU8() {
		return this.id_u8;
	}

	this.SetRoleBase(role_base) {
		this.role_base = role_base;
	}
	this.GetRoleBase() {
		return this.role_base;
	}

	this.SetIdF32(id_f32) {
		this.id_f32 = id_f32;
	}
	this.GetIdF32() {
		return this.id_f32;
	}

	this.SetIdOpU8(id_op_u8) {
		this.id_op_u8_flag = 1;
		this.id_op_u8 = id_op_u8;
	}
	this.GetIdOpU8() {
		return this.id_op_u8;
	}

	this.SetOpRoleBase(op_role_base) {
		this.op_role_base_flag = 1;
		this.op_role_base = op_role_base;
	}
	this.GetOpRoleBase() {
		return this.op_role_base;
	}
}
