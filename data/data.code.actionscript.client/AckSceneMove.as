package proto {
	public class AckSceneMove {
		private _scene_rot_pos: MsgSceneRotPos;
		private _forward: MsgSceneVector3;
		private _ani_name: String;
		private _x_axis: number;
		private _uid: number;


		constructor(packet?: game.util.Packet) {
			if (packet) {
				this._scene_rot_pos = new MsgSceneRotPos(packet);
				this._forward = new MsgSceneVector3(packet);
				this._ani_name = packet.ReadString();
				this._x_axis = packet.ReadShort();
				this._uid = packet.ReadUint();
			}
		}


		public function get scene_rot_pos(): MsgSceneRotPos { return this._scene_rot_pos; }
		public function set scene_rot_pos(value: MsgSceneRotPos) { this._scene_rot_pos = value; }
		public function get forward(): MsgSceneVector3 { return this._forward; }
		public function set forward(value: MsgSceneVector3) { this._forward = value; }
		public function get ani_name(): String { return this._ani_name; }
		public function set ani_name(value: String) { this._ani_name = value; }
		public function get x_axis(): number { return this._x_axis; }
		public function set x_axis(value: number) { this._x_axis = value; }
		public function get uid(): number { return this._uid; }
		public function set uid(value: number) { this._uid = value; }
	}
}
