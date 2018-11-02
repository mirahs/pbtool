package com.data {
	public class AckTestJsOk {
		private var _u64: Number;
		private var _i64: Number;


		public function AckTestJsOk(packet: Packet = null): void {
			if (packet) {
				this._u64 = packet.ReadUlong();
				this._i64 = packet.ReadLong();
			}
		}


		public function get u64(): Number { return this._u64; }
		public function set u64(value: Number): void { this._u64 = value; }
		public function get i64(): Number { return this._i64; }
		public function set i64(value: Number): void { this._i64 = value; }
	}
}
