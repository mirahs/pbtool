package com.data {
	public class MsgFriendBaseAdd {
		private _uid: Number;
		private _uname: String;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteUint(this._uid);
			packet.WriteString(this._uname);
			return packet;
		}


		public function MsgFriendBaseAdd(packet: Packet = null) {
			if (packet) {
				this._uid = packet.ReadUint();
				this._uname = packet.ReadString();
			}
		}

		public function GetBuffer(): Byte
	{
		return this.Encode().GetBuffer();
	}


		public function get uid(): Number { return this._uid; }
		public function set uid(value: Number) { this._uid = value; }
		public function get uname(): String { return this._uname; }
		public function set uname(value: String) { this._uname = value; }
	}
}
