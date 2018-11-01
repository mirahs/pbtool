package proto {
	public class MsgSceneVector3 {
		private _x: number;
		private _y: number;
		private _z: number;


		public function Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
			packet.WriteShort(this._x);
			packet.WriteShort(this._y);
			packet.WriteShort(this._z);
			return packet;
	}


		constructor(packet?: game.util.Packet) {
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


		public function get x(): number { return this._x; }
		public function set x(value: number) { this._x = value; }
		public function get y(): number { return this._y; }
		public function set y(value: number) { this._y = value; }
		public function get z(): number { return this._z; }
		public function set z(value: number) { this._z = value; }
	}
}
