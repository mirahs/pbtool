package com.data {
	public class MsgSceneRotPos {
		private _rot_x: int;
		private _rot_y: int;
		private _rot_z: int;
		private _pos_x: int;
		private _pos_y: int;
		private _pos_z: int;


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


		public function MsgSceneRotPos(packet: Packet = null) {
			if (packet) {
				this._rot_x = packet.ReadShort();
				this._rot_y = packet.ReadShort();
				this._rot_z = packet.ReadShort();
				this._pos_x = packet.ReadShort();
				this._pos_y = packet.ReadShort();
				this._pos_z = packet.ReadShort();
			}
		}

		public function GetBuffer(): Byte
	{
		return this.Encode().GetBuffer();
	}


		public function get rot_x(): int { return this._rot_x; }
		public function set rot_x(value: int) { this._rot_x = value; }
		public function get rot_y(): int { return this._rot_y; }
		public function set rot_y(value: int) { this._rot_y = value; }
		public function get rot_z(): int { return this._rot_z; }
		public function set rot_z(value: int) { this._rot_z = value; }
		public function get pos_x(): int { return this._pos_x; }
		public function set pos_x(value: int) { this._pos_x = value; }
		public function get pos_y(): int { return this._pos_y; }
		public function set pos_y(value: int) { this._pos_y = value; }
		public function get pos_z(): int { return this._pos_z; }
		public function set pos_z(value: int) { this._pos_z = value; }
	}
}
