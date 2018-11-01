package proto {
	public class ReqRoleCreate {
		private _uid: Number;
		private _uuid: Number;
		private _sid: Number;
		private _cid: Number;
		private _os: String;
		private _version: String;
		private _uname: String;
		private _source: String;
		private _source_sub: String;
		private _login_time: Number;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteUint(this._uid);
			packet.WriteUint(this._uuid);
			packet.WriteUshort(this._sid);
			packet.WriteUshort(this._cid);
			packet.WriteString(this._os);
			packet.WriteString(this._version);
			packet.WriteString(this._uname);
			packet.WriteString(this._source);
			packet.WriteString(this._source_sub);
			packet.WriteUint(this._login_time);
			packet.Encode(1020);
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
		public function get os(): String { return this._os; }
		public function set os(value: String) { this._os = value; }
		public function get version(): String { return this._version; }
		public function set version(value: String) { this._version = value; }
		public function get uname(): String { return this._uname; }
		public function set uname(value: String) { this._uname = value; }
		public function get source(): String { return this._source; }
		public function set source(value: String) { this._source = value; }
		public function get source_sub(): String { return this._source_sub; }
		public function set source_sub(value: String) { this._source_sub = value; }
		public function get login_time(): Number { return this._login_time; }
		public function set login_time(value: Number) { this._login_time = value; }
	}
}
