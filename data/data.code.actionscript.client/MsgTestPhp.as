package com.data {
	public class MsgTestPhp {
		private _u16: Number;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteUshort(this._u16);
			return packet;
		}


		public function MsgTestPhp(packet: Packet = null) {
			if (packet) {
				this._u16 = packet.ReadUshort();
			}
		}

		public function GetBuffer(): Byte
	{
		return this.Encode().GetBuffer();
	}


		public function get u16(): Number { return this._u16; }
		public function set u16(value: Number) { this._u16 = value; }
	}
}
