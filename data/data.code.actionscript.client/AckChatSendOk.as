package com.data {
	public class AckChatSendOk {
		private _channel: Number;
		private _uid: Number;
		private _uname: String;
		private _content: String;


		public function AckChatSendOk(packet: Packet = null) {
			if (packet) {
				this._channel = packet.ReadByte();
				this._uid = packet.ReadUint();
				this._uname = packet.ReadString();
				this._content = packet.ReadString();
			}
		}


		public function get channel(): Number { return this._channel; }
		public function set channel(value: Number) { this._channel = value; }
		public function get uid(): Number { return this._uid; }
		public function set uid(value: Number) { this._uid = value; }
		public function get uname(): String { return this._uname; }
		public function set uname(value: String) { this._uname = value; }
		public function get content(): String { return this._content; }
		public function set content(value: String) { this._content = value; }
	}
}
