package proto {
	public class MsgScenePlayer {
		private var _uid: uint;
		private var _scene_rot_pos: MsgSceneRotPos;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteUint(this._uid);
			packet.WriteBuffer(this._scene_rot_pos.GetBuffer());
			return packet;
		}


		public function MsgScenePlayer(packet: Packet = null) {
			if (packet) {
				this._uid = packet.ReadUint();
				this._scene_rot_pos = new MsgSceneRotPos(packet);
			}
		}

		public function GetBuffer(): Byte
		{
			return this.Encode().GetBuffer();
		}


		public function get uid(): uint { return this._uid; }
		public function set uid(value: uint): void { this._uid = value; }
		public function get scene_rot_pos(): MsgSceneRotPos { return this._scene_rot_pos; }
		public function set scene_rot_pos(value: MsgSceneRotPos): void { this._scene_rot_pos = value; }
	}
}
