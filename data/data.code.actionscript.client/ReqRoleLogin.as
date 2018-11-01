package proto {
	public class ReqRoleLogin {
		private _uid: number;
		private _uuid: number;
		private _sid: number;
		private _cid: number;
		private _login_time: number;
		private _pwd: String;
		private _relink: number;
		private _debug: number;
		private _os: String;
		private _version: String;


		public function Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
			packet.WriteUint(this._uid);
			packet.WriteUint(this._uuid);
			packet.WriteUshort(this._sid);
			packet.WriteUshort(this._cid);
			packet.WriteUint(this._login_time);
			packet.WriteString(this._pwd);
			packet.WriteByte(this._relink);
			packet.WriteByte(this._debug);
			packet.WriteString(this._os);
			packet.WriteString(this._version);
			packet.Encode(1010);
			return packet;
	}


		public function get uid(): number { return this._uid; }
		public function set uid(value: number) { this._uid = value; }
		public function get uuid(): number { return this._uuid; }
		public function set uuid(value: number) { this._uuid = value; }
		public function get sid(): number { return this._sid; }
		public function set sid(value: number) { this._sid = value; }
		public function get cid(): number { return this._cid; }
		public function set cid(value: number) { this._cid = value; }
		public function get login_time(): number { return this._login_time; }
		public function set login_time(value: number) { this._login_time = value; }
		public function get pwd(): String { return this._pwd; }
		public function set pwd(value: String) { this._pwd = value; }
		public function get relink(): number { return this._relink; }
		public function set relink(value: number) { this._relink = value; }
		public function get debug(): number { return this._debug; }
		public function set debug(value: number) { this._debug = value; }
		public function get os(): String { return this._os; }
		public function set os(value: String) { this._os = value; }
		public function get version(): String { return this._version; }
		public function set version(value: String) { this._version = value; }
	}
}
