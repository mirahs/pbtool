package proto {
	public class ReqChatGm {
		private _content: String;


		public function Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
			packet.WriteString(this._content);
			packet.Encode(1530);
			return packet;
	}


		public function get content(): String { return this._content; }
		public function set content(value: String) { this._content = value; }
	}
}
