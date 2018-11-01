package proto {
	public class MsgFriendBaseAdd {
		private _uid: number;
		private _uname: String;


		public function Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
			packet.WriteUint(this._uid);
			packet.WriteString(this._uname);
			return packet;
	}


		constructor(packet?: game.util.Packet) {
			if (packet) {
				this._uid = packet.ReadUint();
				this._uname = packet.ReadString();
			}
		}

		public function GetBuffer(): ByteBuffer
	{
		return this.Encode().GetBuffer();
	}


		public function get uid(): number { return this._uid; }
		public function set uid(value: number) { this._uid = value; }
		public function get uname(): String { return this._uname; }
		public function set uname(value: String) { this._uname = value; }
	}
}
