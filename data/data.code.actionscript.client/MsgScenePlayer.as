package proto {
	public class MsgScenePlayer {
		private _uid: number;
		private _scene_rot_pos: MsgSceneRotPos;


		public function Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
			packet.WriteUint(this._uid);
			packet.WriteBuffer(this._scene_rot_pos.GetBuffer());
			return packet;
	}


		constructor(packet?: game.util.Packet) {
			if (packet) {
				this._uid = packet.ReadUint();
				this._scene_rot_pos = new MsgSceneRotPos(packet);
			}
		}

		public function GetBuffer(): ByteBuffer
	{
		return this.Encode().GetBuffer();
	}


		public function get uid(): number { return this._uid; }
		public function set uid(value: number) { this._uid = value; }
		public function get scene_rot_pos(): MsgSceneRotPos { return this._scene_rot_pos; }
		public function set scene_rot_pos(value: MsgSceneRotPos) { this._scene_rot_pos = value; }
	}
}
