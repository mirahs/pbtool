package com.data {
	public class ReqChatGm {
		private _content: String;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteString(this._content);
			packet.Encode(1530);
			return packet;
		}


		public function get content(): String { return this._content; }
		public function set content(value: String) { this._content = value; }
	}
}
