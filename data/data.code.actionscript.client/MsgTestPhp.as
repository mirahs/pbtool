package com.data {
	public class MsgTestPhp {
		private var _u16: uint;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteUshort(this._u16);
			return packet;
		}


		public function MsgTestPhp(packet: Packet = null): void {
			if (packet) {
				this._u16 = packet.ReadUshort();
			}
		}

		public function GetBuffer(): Byte
		{
			return this.Encode().GetBuffer();
		}


		public function get u16(): uint { return this._u16; }
		public function set u16(value: uint): void { this._u16 = value; }
	}
}
