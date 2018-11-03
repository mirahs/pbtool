package proto {
	public class AckRoleLoginOk {
		private var _uname: String;


		public function AckRoleLoginOk(packet: Packet = null) {
			if (packet) {
				this._uname = packet.ReadString();
			}
		}


		public function get uname(): String { return this._uname; }
		public function set uname(value: String): void { this._uname = value; }
	}
}
