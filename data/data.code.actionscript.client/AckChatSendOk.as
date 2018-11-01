package proto {
	public class AckChatSendOk {
		private _channel: number;
		private _uid: number;
		private _uname: String;
		private _content: String;


		constructor(packet?: game.util.Packet) {
			if (packet) {
				this._channel = packet.ReadByte();
				this._uid = packet.ReadUint();
				this._uname = packet.ReadString();
				this._content = packet.ReadString();
			}
		}


		public function get channel(): number { return this._channel; }
		public function set channel(value: number) { this._channel = value; }
		public function get uid(): number { return this._uid; }
		public function set uid(value: number) { this._uid = value; }
		public function get uname(): String { return this._uname; }
		public function set uname(value: String) { this._uname = value; }
		public function get content(): String { return this._content; }
		public function set content(value: String) { this._content = value; }
	}
}
