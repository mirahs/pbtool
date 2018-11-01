package com.data {
	public class AckSceneExit {
		private _uid: Number;


		public function AckSceneExit(packet: Packet = null) {
			if (packet) {
				this._uid = packet.ReadUint();
			}
		}


		public function get uid(): Number { return this._uid; }
		public function set uid(value: Number) { this._uid = value; }
	}
}
