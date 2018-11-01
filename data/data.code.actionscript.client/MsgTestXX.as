package proto {
	public class MsgTestXX {
		private _id_u8: Number;
		private _id_f32: Array = [];
		private id_op_u8_flag: Number = 0;
		private _id_op_u8: Number;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteByte(this._id_u8);
			var id_f32_count: Number = this._id_f32.length;
			packet.WriteUshort(id_f32_count);
			for (var i: Number = 0; i < id_f32_count; i++)
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


		constructor(packet: Packet = null) {
			if (packet) {
				this._id_u8 = packet.ReadByte();
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
			}
		}

		public function GetBuffer(): ByteBuffer
	{
		return this.Encode().GetBuffer();
	}


		public function get id_u8(): Number { return this._id_u8; }
		public function set id_u8(value: Number) { this._id_u8 = value; }
		public function get id_f32(): Array {return this._id_f32; }
		public function set id_f32(value: Array) { this._id_f32 = value; }
		public function get id_op_u8(): Number { return this._id_op_u8; }
		public function set id_op_u8(value: Number) { this.id_op_u8_flag = 1; this._id_op_u8 = value; }
	}
}
