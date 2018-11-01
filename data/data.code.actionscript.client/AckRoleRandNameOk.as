package proto {
	public class AckRoleRandNameOk {
		private _uname: String;


		constructor(packet?: game.util.Packet) {
			if (packet) {
				this._uname = packet.ReadString();
			}
		}


		public function get uname(): String { return this._uname; }
		public function set uname(value: String) { this._uname = value; }
	}
}
