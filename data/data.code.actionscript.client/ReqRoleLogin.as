package com.data {
	public class ReqRoleLogin {
		private _uid: uint;
		private _uuid: uint;
		private _sid: uint;
		private _cid: uint;
		private _login_time: uint;
		private _pwd: String;
		private _relink: uint;
		private _debug: uint;
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


		public function get uid(): uint { return this._uid; }
		public function set uid(value: uint) { this._uid = value; }
		public function get uuid(): uint { return this._uuid; }
		public function set uuid(value: uint) { this._uuid = value; }
		public function get sid(): uint { return this._sid; }
		public function set sid(value: uint) { this._sid = value; }
		public function get cid(): uint { return this._cid; }
		public function set cid(value: uint) { this._cid = value; }
		public function get login_time(): uint { return this._login_time; }
		public function set login_time(value: uint) { this._login_time = value; }
		public function get pwd(): String { return this._pwd; }
		public function set pwd(value: String) { this._pwd = value; }
		public function get relink(): uint { return this._relink; }
		public function set relink(value: uint) { this._relink = value; }
		public function get debug(): uint { return this._debug; }
		public function set debug(value: uint) { this._debug = value; }
		public function get os(): String { return this._os; }
		public function set os(value: String) { this._os = value; }
		public function get version(): String { return this._version; }
		public function set version(value: String) { this._version = value; }
	}
}
