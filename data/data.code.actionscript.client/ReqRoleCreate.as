package com.data {
	public class ReqRoleCreate {
		private _uid: uint;
		private _uuid: uint;
		private _sid: uint;
		private _cid: uint;
		private _os: String;
		private _version: String;
		private _uname: String;
		private _source: String;
		private _source_sub: String;
		private _login_time: uint;


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


		public function get uid(): uint { return this._uid; }
		public function set uid(value: uint) { this._uid = value; }
		public function get uuid(): uint { return this._uuid; }
		public function set uuid(value: uint) { this._uuid = value; }
		public function get sid(): uint { return this._sid; }
		public function set sid(value: uint) { this._sid = value; }
		public function get cid(): uint { return this._cid; }
		public function set cid(value: uint) { this._cid = value; }
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
		public function get login_time(): uint { return this._login_time; }
		public function set login_time(value: uint) { this._login_time = value; }
	}
}
