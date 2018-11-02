package com.data {
	public class AckRoleRandNameOk {
		private var _uname: String;


		public function AckRoleRandNameOk(packet: Packet = null): void {
			if (packet) {
				this._uname = packet.ReadString();
			}
		}


		public function get uname(): String { return this._uname; }
		public function set uname(value: String): void { this._uname = value; }
	}
}
