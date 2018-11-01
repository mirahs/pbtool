package proto {
	public class AckTestJsOk {
		private _u64: Number;
		private _i64: Number;


		constructor(packet: Packet = null) {
			if (packet) {
				this._u64 = packet.ReadUlong();
				this._i64 = packet.ReadLong();
			}
		}


		public function get u64(): Number { return this._u64; }
		public function set u64(value: Number) { this._u64 = value; }
		public function get i64(): Number { return this._i64; }
		public function set i64(value: Number) { this._i64 = value; }
	}
}