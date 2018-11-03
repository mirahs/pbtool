package proto {
	public class MsgFriendBaseAdd {
		private var _uid: uint;
		private var _uname: String;


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


		public function get uid(): uint { return this._uid; }
		public function set uid(value: uint): void { this._uid = value; }
		public function get uname(): String { return this._uname; }
		public function set uname(value: String): void { this._uname = value; }
	}
}
