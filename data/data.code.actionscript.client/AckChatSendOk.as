package com.data {
	public class AckChatSendOk {
		private var _channel: uint;
		private var _uid: uint;
		private var _uname: String;
		private var _content: String;


		public function AckChatSendOk(packet: Packet = null): void {
			if (packet) {
				this._channel = packet.ReadByte();
				this._uid = packet.ReadUint();
				this._uname = packet.ReadString();
				this._content = packet.ReadString();
			}
		}


		public function get channel(): uint { return this._channel; }
		public function set channel(value: uint): void { this._channel = value; }
		public function get uid(): uint { return this._uid; }
		public function set uid(value: uint): void { this._uid = value; }
		public function get uname(): String { return this._uname; }
		public function set uname(value: String): void { this._uname = value; }
		public function get content(): String { return this._content; }
		public function set content(value: String): void { this._content = value; }
	}
}
