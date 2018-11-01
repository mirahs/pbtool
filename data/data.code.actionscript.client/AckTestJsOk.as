package com.data {
	public class AckTestJsOk {
		private _u64: uint;
		private _i64: int;


		public function AckTestJsOk(packet: Packet = null) {
			if (packet) {
				this._u64 = packet.ReadUlong();
				this._i64 = packet.ReadLong();
			}
		}


		public function get u64(): uint { return this._u64; }
		public function set u64(value: uint) { this._u64 = value; }
		public function get i64(): int { return this._i64; }
		public function set i64(value: int) { this._i64 = value; }
	}
}
