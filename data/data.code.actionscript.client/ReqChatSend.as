package proto {
	public class ReqChatSend {
		private _channel: number;
		private _dest_uid: number;
		private _content: String;


		public function Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
			packet.WriteByte(this._channel);
			packet.WriteUint(this._dest_uid);
			packet.WriteString(this._content);
			packet.Encode(1510);
			return packet;
	}


		public function get channel(): number { return this._channel; }
		public function set channel(value: number) { this._channel = value; }
		public function get dest_uid(): number { return this._dest_uid; }
		public function set dest_uid(value: number) { this._dest_uid = value; }
		public function get content(): String { return this._content; }
		public function set content(value: String) { this._content = value; }
	}
}
