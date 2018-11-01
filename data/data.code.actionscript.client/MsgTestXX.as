package com.data {
	public class MsgTestXX {
		private var _id_u8: uint;
		private var _id_f32: Array = [];
		private var id_op_u8_flag: uint = 0;
		private var _id_op_u8: uint;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteByte(this._id_u8);
			var id_f32_count: int = this._id_f32.length;
			packet.WriteUshort(id_f32_count);
			for (var i: int = 0; i < id_f32_count; i++)
			{
				var xxx: Number = this._id_f32[i];
				packet.WriteFloat(xxx);
			}
			packet.WriteByte(this.id_op_u8_flag);
			if (this.id_op_u8_flag == 1)
			{
				packet.WriteByte(this._id_op_u8);
			}
			return packet;
		}


		public function MsgTestXX(packet: Packet = null) {
			if (packet) {
				this._id_u8 = packet.ReadByte();
				this._id_f32 = [];
				var id_f32_count: int = packet.ReadUshort();
				for (var i: int = 0; i < id_f32_count; i++)
				{
					this._id_f32.push(packet.ReadFloat());
				}
				this. id_op_u8_flag = packet.ReadByte();
				if (this.id_op_u8_flag == 1)
				{
					this._id_op_u8 = packet.ReadByte();
				}
			}
		}

		public function GetBuffer(): Byte
		{
			return this.Encode().GetBuffer();
		}


		public function get id_u8(): uint { return this._id_u8; }
		public function set id_u8(value: uint): void { this._id_u8 = value; }
		public function get id_f32(): Array {return this._id_f32; }
		public function set id_f32(value: Array): void { this._id_f32 = value; }
		public function get id_op_u8(): uint { return this._id_op_u8; }
		public function set id_op_u8(value: uint): void { this.id_op_u8_flag = 1; this._id_op_u8 = value; }
	}
}
