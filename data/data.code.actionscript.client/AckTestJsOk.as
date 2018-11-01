package proto {
	public class AckTestJsOk {
		private _u64: number;
		private _i64: number;


		constructor(packet?: game.util.Packet) {
			if (packet) {
				this._u64 = packet.ReadUlong();
				this._i64 = packet.ReadLong();
			}
		}


		public function get u64(): number { return this._u64; }
		public function set u64(value: number) { this._u64 = value; }
		public function get i64(): number { return this._i64; }
		public function set i64(value: number) { this._i64 = value; }
	}
}
