package proto {
	public class MsgSceneRotPos {
		private _rot_x: number;
		private _rot_y: number;
		private _rot_z: number;
		private _pos_x: number;
		private _pos_y: number;
		private _pos_z: number;


		public function Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
			packet.WriteShort(this._rot_x);
			packet.WriteShort(this._rot_y);
			packet.WriteShort(this._rot_z);
			packet.WriteShort(this._pos_x);
			packet.WriteShort(this._pos_y);
			packet.WriteShort(this._pos_z);
			return packet;
	}


		constructor(packet?: game.util.Packet) {
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


		public function get rot_x(): number { return this._rot_x; }
		public function set rot_x(value: number) { this._rot_x = value; }
		public function get rot_y(): number { return this._rot_y; }
		public function set rot_y(value: number) { this._rot_y = value; }
		public function get rot_z(): number { return this._rot_z; }
		public function set rot_z(value: number) { this._rot_z = value; }
		public function get pos_x(): number { return this._pos_x; }
		public function set pos_x(value: number) { this._pos_x = value; }
		public function get pos_y(): number { return this._pos_y; }
		public function set pos_y(value: number) { this._pos_y = value; }
		public function get pos_z(): number { return this._pos_z; }
		public function set pos_z(value: number) { this._pos_z = value; }
	}
}
