package proto {
	public class ReqTestJs {
		private _u64: number;
		private _i64: number;


		public function Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
			packet.WriteUlong(this._u64);
			packet.WriteLong(this._i64);
			packet.Encode(40080);
			return packet;
	}


		public function get u64(): number { return this._u64; }
		public function set u64(value: number) { this._u64 = value; }
		public function get i64(): number { return this._i64; }
		public function set i64(value: number) { this._i64 = value; }
	}
}
