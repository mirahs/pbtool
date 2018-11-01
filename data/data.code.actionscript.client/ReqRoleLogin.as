package proto {
	public class ReqRoleLogin {
		private _uid: Number;
		private _uuid: Number;
		private _sid: Number;
		private _cid: Number;
		private _login_time: Number;
		private _pwd: String;
		private _relink: Number;
		private _debug: Number;
		private _os: String;
		private _version: String;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
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


		public function get uid(): Number { return this._uid; }
		public function set uid(value: Number) { this._uid = value; }
		public function get uuid(): Number { return this._uuid; }
		public function set uuid(value: Number) { this._uuid = value; }
		public function get sid(): Number { return this._sid; }
		public function set sid(value: Number) { this._sid = value; }
		public function get cid(): Number { return this._cid; }
		public function set cid(value: Number) { this._cid = value; }
		public function get login_time(): Number { return this._login_time; }
		public function set login_time(value: Number) { this._login_time = value; }
		public function get pwd(): String { return this._pwd; }
		public function set pwd(value: String) { this._pwd = value; }
		public function get relink(): Number { return this._relink; }
		public function set relink(value: Number) { this._relink = value; }
		public function get debug(): Number { return this._debug; }
		public function set debug(value: Number) { this._debug = value; }
		public function get os(): String { return this._os; }
		public function set os(value: String) { this._os = value; }
		public function get version(): String { return this._version; }
		public function set version(value: String) { this._version = value; }
	}
}
