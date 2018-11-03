package proto {
	public class ReqChatSend {
		private var _channel: uint;
		private var _dest_uid: uint;
		private var _content: String;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteByte(this._channel);
			packet.WriteUint(this._dest_uid);
			packet.WriteString(this._content);
			packet.Encode(1510);
			return packet;
		}


		public function get channel(): uint { return this._channel; }
		public function set channel(value: uint): void { this._channel = value; }
		public function get dest_uid(): uint { return this._dest_uid; }
		public function set dest_uid(value: uint): void { this._dest_uid = value; }
		public function get content(): String { return this._content; }
		public function set content(value: String): void { this._content = value; }
	}
}
