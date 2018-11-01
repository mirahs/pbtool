package proto {
	public class ReqTestSend {
		private _id_u8: number;
		private _role_base: MsgRoleBase;
		private _id_f32: number[] = [];
		private id_op_u8_flag: number = 0;
		private _id_op_u8: number;
		private op_role_base_flag: number = 0;
		private _op_role_base: MsgRoleBase;


		public function Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
			packet.WriteByte(this._id_u8);
			packet.WriteBuffer(this._role_base.GetBuffer());
			let id_f32_count: number = this._id_f32.length;
			packet.WriteUshort(id_f32_count);
			for (var i: number = 0; i < id_f32_count; i++)
		{
				let xxx: number = this._id_f32[i];
				packet.WriteFloat(xxx);
		}
			packet.WriteByte(this.id_op_u8_flag);
			if (this.id_op_u8_flag == 1)
		{
				packet.WriteByte(this._id_op_u8);
		}
			packet.WriteByte(this.op_role_base_flag);
			if (this.op_role_base_flag == 1)
		{
				packet.WriteBuffer(this._op_role_base.GetBuffer());
		}
			packet.Encode(40010);
			return packet;
	}


		public function get id_u8(): number { return this._id_u8; }
		public function set id_u8(value: number) { this._id_u8 = value; }
		public function get role_base(): MsgRoleBase { return this._role_base; }
		public function set role_base(value: MsgRoleBase) { this._role_base = value; }
		public function get id_f32(): number[] {return this._id_f32; }
		public function set id_f32(value: number[]) { this._id_f32 = value; }
		public function get id_op_u8(): number { return this._id_op_u8; }
		public function set id_op_u8(value: number) { this.id_op_u8_flag = 1; this._id_op_u8 = value; }
		public function get op_role_base(): MsgRoleBase { return this._op_role_base; }
		public function set op_role_base(value: MsgRoleBase) { this.op_role_base_flag = 1; this._op_role_base = value; }
	}
}
