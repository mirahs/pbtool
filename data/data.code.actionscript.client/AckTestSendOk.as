package com.data {
	public class AckTestSendOk {
		private _id_u8: uint;
		private _role_base: MsgRoleBase;
		private _id_f32: Array = [];
		private id_op_u8_flag: Number = 0;
		private _id_op_u8: uint;
		private op_role_base_flag: Number = 0;
		private _op_role_base: MsgRoleBase;


		public function AckTestSendOk(packet: Packet = null) {
			if (packet) {
				this._id_u8 = packet.ReadByte();
				this._role_base = new MsgRoleBase(packet);
				this._id_f32 = [];
				var id_f32_count: Number = packet.ReadUshort();
				for (var i: Number = 0; i < id_f32_count; i++)
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
		}


		public function get id_u8(): uint { return this._id_u8; }
		public function set id_u8(value: uint) { this._id_u8 = value; }
		public function get role_base(): MsgRoleBase { return this._role_base; }
		public function set role_base(value: MsgRoleBase) { this._role_base = value; }
		public function get id_f32(): Array {return this._id_f32; }
		public function set id_f32(value: Array) { this._id_f32 = value; }
		public function get id_op_u8(): uint { return this._id_op_u8; }
		public function set id_op_u8(value: uint) { this.id_op_u8_flag = 1; this._id_op_u8 = value; }
		public function get op_role_base(): MsgRoleBase { return this._op_role_base; }
		public function set op_role_base(value: MsgRoleBase) { this.op_role_base_flag = 1; this._op_role_base = value; }
	}
}
