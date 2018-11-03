package proto {
	public class MsgSceneVector3 {
		private var _x: int;
		private var _y: int;
		private var _z: int;


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
		public function set x(value: int): void { this._x = value; }
		public function get y(): int { return this._y; }
		public function set y(value: int): void { this._y = value; }
		public function get z(): int { return this._z; }
		public function set z(value: int): void { this._z = value; }
	}
}
