package proto {
	public class ReqTestJs {
		private _u64: Number;
		private _i64: Number;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteUlong(this._u64);
			packet.WriteLong(this._i64);
			packet.Encode(40080);
			return packet;
		}


		public function get u64(): Number { return this._u64; }
		public function set u64(value: Number) { this._u64 = value; }
		public function get i64(): Number { return this._i64; }
		public function set i64(value: Number) { this._i64 = value; }
	}
}
