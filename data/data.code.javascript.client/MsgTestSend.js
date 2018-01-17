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


	this.SetIdU8 = function(id_u8) {
		this._id_u8 = id_u8;
	}
	this.GetIdU8= function() {
		return this._id_u8;
	}

	this.SetRoleBase = function(role_base) {
		this._role_base = role_base;
	}
	this.GetRoleBase= function() {
		return this._role_base;
	}

	this.SetIdF32 = function(id_f32) {
		this._id_f32 = id_f32;
	}
	this.GetIdF32= function() {
		return this._id_f32;
	}

	this.SetIdOpU8 = function(id_op_u8) {
		this._id_op_u8_flag = 1;
		this._id_op_u8 = id_op_u8;
	}
	this.GetIdOpU8= function() {
		return this._id_op_u8;
	}

	this.SetOpRoleBase = function(op_role_base) {
		this._op_role_base_flag = 1;
		this._op_role_base = op_role_base;
	}
	this.GetOpRoleBase= function() {
		return this._op_role_base;
	}
}
