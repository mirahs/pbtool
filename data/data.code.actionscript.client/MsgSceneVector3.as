package proto {
	public class MsgSceneVector3 {
		private _x: Number;
		private _y: Number;
		private _z: Number;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteShort(this._x);
			packet.WriteShort(this._y);
			packet.WriteShort(this._z);
			return packet;
		}


		constructor(packet: Packet = null) {
			if (packet) {
				this._x = packet.ReadShort();
				this._y = packet.ReadShort();
				this._z = packet.ReadShort();
			}
		}

		public function GetBuffer(): ByteBuffer
	{
		return this.Encode().GetBuffer();
	}


		public function get x(): Number { return this._x; }
		public function set x(value: Number) { this._x = value; }
		public function get y(): Number { return this._y; }
		public function set y(value: Number) { this._y = value; }
		public function get z(): Number { return this._z; }
		public function set z(value: Number) { this._z = value; }
	}
}
