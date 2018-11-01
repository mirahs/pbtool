package proto {
	public class AckTestXX {
		private _id_u8: Number;
		private _id_u16: Number;
		private _id_u32: Number;
		private _repeat_id_u8: Array = [];
		private optional_id_u8_flag: Number = 0;
		private _optional_id_u8: Number;


		constructor(packet: Packet = null) {
			if (packet) {
				this._id_u8 = packet.ReadByte();
				this._id_u16 = packet.ReadUshort();
				this._id_u32 = packet.ReadUint();
				this._repeat_id_u8 = [];
				var repeat_id_u8_count: Number = packet.ReadUshort();
				for (var i: Number = 0; i < repeat_id_u8_count; i++)
				{
					this._repeat_id_u8.push(packet.ReadByte());
				}
				this. optional_id_u8_flag = packet.ReadByte();
				if (this.optional_id_u8_flag == 1)
				{
					this._optional_id_u8 = packet.ReadByte();
				}
			}
		}


		public function get id_u8(): Number { return this._id_u8; }
		public function set id_u8(value: Number) { this._id_u8 = value; }
		public function get id_u16(): Number { return this._id_u16; }
		public function set id_u16(value: Number) { this._id_u16 = value; }
		public function get id_u32(): Number { return this._id_u32; }
		public function set id_u32(value: Number) { this._id_u32 = value; }
		public function get repeat_id_u8(): Array {return this._repeat_id_u8; }
		public function set repeat_id_u8(value: Array) { this._repeat_id_u8 = value; }
		public function get optional_id_u8(): Number { return this._optional_id_u8; }
		public function set optional_id_u8(value: Number) { this.optional_id_u8_flag = 1; this._optional_id_u8 = value; }
	}
}