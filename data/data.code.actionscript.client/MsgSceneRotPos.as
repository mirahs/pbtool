package proto {
	public class MsgSceneRotPos {
		private _rot_x: Number;
		private _rot_y: Number;
		private _rot_z: Number;
		private _pos_x: Number;
		private _pos_y: Number;
		private _pos_z: Number;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteShort(this._rot_x);
			packet.WriteShort(this._rot_y);
			packet.WriteShort(this._rot_z);
			packet.WriteShort(this._pos_x);
			packet.WriteShort(this._pos_y);
			packet.WriteShort(this._pos_z);
			return packet;
		}


		constructor(packet: Packet = null) {
			if (packet) {
				this._rot_x = packet.ReadShort();
				this._rot_y = packet.ReadShort();
				this._rot_z = packet.ReadShort();
				this._pos_x = packet.ReadShort();
				this._pos_y = packet.ReadShort();
				this._pos_z = packet.ReadShort();
			}
		}

		public function GetBuffer(): ByteBuffer
	{
		return this.Encode().GetBuffer();
	}


		public function get rot_x(): Number { return this._rot_x; }
		public function set rot_x(value: Number) { this._rot_x = value; }
		public function get rot_y(): Number { return this._rot_y; }
		public function set rot_y(value: Number) { this._rot_y = value; }
		public function get rot_z(): Number { return this._rot_z; }
		public function set rot_z(value: Number) { this._rot_z = value; }
		public function get pos_x(): Number { return this._pos_x; }
		public function set pos_x(value: Number) { this._pos_x = value; }
		public function get pos_y(): Number { return this._pos_y; }
		public function set pos_y(value: Number) { this._pos_y = value; }
		public function get pos_z(): Number { return this._pos_z; }
		public function set pos_z(value: Number) { this._pos_z = value; }
	}
}
