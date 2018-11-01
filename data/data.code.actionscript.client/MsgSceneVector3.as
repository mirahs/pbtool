package com.data {
	public class MsgSceneVector3 {
		private _x: int;
		private _y: int;
		private _z: int;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteShort(this._x);
			packet.WriteShort(this._y);
			packet.WriteShort(this._z);
			return packet;
		}


		public function MsgSceneVector3(packet: Packet = null) {
			if (packet) {
				this._x = packet.ReadShort();
				this._y = packet.ReadShort();
				this._z = packet.ReadShort();
			}
		}

		public function GetBuffer(): Byte
	{
		return this.Encode().GetBuffer();
	}


		public function get x(): int { return this._x; }
		public function set x(value: int) { this._x = value; }
		public function get y(): int { return this._y; }
		public function set y(value: int) { this._y = value; }
		public function get z(): int { return this._z; }
		public function set z(value: int) { this._z = value; }
	}
}
