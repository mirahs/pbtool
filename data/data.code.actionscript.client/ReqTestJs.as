package com.data {
	public class ReqTestJs {
		private _u64: uint;
		private _i64: int;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteUlong(this._u64);
			packet.WriteLong(this._i64);
			packet.Encode(40080);
			return packet;
		}


		public function get u64(): uint { return this._u64; }
		public function set u64(value: uint) { this._u64 = value; }
		public function get i64(): int { return this._i64; }
		public function set i64(value: int) { this._i64 = value; }
	}
}
