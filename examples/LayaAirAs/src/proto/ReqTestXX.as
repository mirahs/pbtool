package proto {
	public class ReqTestXX {
		private var _id_u8: uint;
		private var _id_u16: uint;
		private var _id_u32: uint;
		private var _repeat_id_u8: Array = [];
		private var optional_id_u8_flag: uint = 0;
		private var _optional_id_u8: uint;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteByte(this._id_u8);
			packet.WriteUshort(this._id_u16);
			packet.WriteUint(this._id_u32);
			var repeat_id_u8_count: int = this._repeat_id_u8.length;
			packet.WriteUshort(repeat_id_u8_count);
			for (var i: int = 0; i < repeat_id_u8_count; i++)
			{
				var xxx: uint = this._repeat_id_u8[i];
				packet.WriteByte(xxx);
			}
			packet.WriteByte(this.optional_id_u8_flag);
			if (this.optional_id_u8_flag == 1)
			{
				packet.WriteByte(this._optional_id_u8);
			}
			packet.Encode(40040);
			return packet;
		}


		public function get id_u8(): uint { return this._id_u8; }
		public function set id_u8(value: uint): void { this._id_u8 = value; }
		public function get id_u16(): uint { return this._id_u16; }
		public function set id_u16(value: uint): void { this._id_u16 = value; }
		public function get id_u32(): uint { return this._id_u32; }
		public function set id_u32(value: uint): void { this._id_u32 = value; }
		public function get repeat_id_u8(): Array {return this._repeat_id_u8; }
		public function set repeat_id_u8(value: Array): void { this._repeat_id_u8 = value; }
		public function get optional_id_u8(): uint { return this._optional_id_u8; }
		public function set optional_id_u8(value: uint): void { this.optional_id_u8_flag = 1; this._optional_id_u8 = value; }
	}
}
