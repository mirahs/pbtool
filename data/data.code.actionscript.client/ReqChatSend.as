package com.data {
	public class ReqChatSend {
		private _channel: uint;
		private _dest_uid: uint;
		private _content: String;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteByte(this._channel);
			packet.WriteUint(this._dest_uid);
			packet.WriteString(this._content);
			packet.Encode(1510);
			return packet;
		}


		public function get channel(): uint { return this._channel; }
		public function set channel(value: uint) { this._channel = value; }
		public function get dest_uid(): uint { return this._dest_uid; }
		public function set dest_uid(value: uint) { this._dest_uid = value; }
		public function get content(): String { return this._content; }
		public function set content(value: String) { this._content = value; }
	}
}
