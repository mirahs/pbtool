package proto {
	public class MsgTestPhp {
		private _u16: number;


		public function Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
			packet.WriteUshort(this._u16);
			return packet;
	}


		constructor(packet?: game.util.Packet) {
			if (packet) {
				this._u16 = packet.ReadUshort();
			}
		}

		public function GetBuffer(): ByteBuffer
	{
		return this.Encode().GetBuffer();
	}


		public function get u16(): number { return this._u16; }
		public function set u16(value: number) { this._u16 = value; }
	}
}
