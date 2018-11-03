package proto {
	public class AckTestXX {
		private var _id_u8: uint;
		private var _id_u16: uint;
		private var _id_u32: uint;
		private var _repeat_id_u8: Array = [];
		private var optional_id_u8_flag: uint = 0;
		private var _optional_id_u8: uint;


		public function AckTestXX(packet: Packet = null) {
			if (packet) {
				this._id_u8 = packet.ReadByte();
				this._id_u16 = packet.ReadUshort();
				this._id_u32 = packet.ReadUint();
				this._repeat_id_u8 = [];
				var repeat_id_u8_count: int = packet.ReadUshort();
				for (var i: int = 0; i < repeat_id_u8_count; i++)
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
