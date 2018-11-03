package proto {
	import laya.utils.Byte;
	public class AckSceneMove {
		private var _scene_rot_pos: MsgSceneRotPos;
		private var _forward: MsgSceneVector3;
		private var _ani_name: String;
		private var _x_axis: int;
		private var _uid: uint;


		public function AckSceneMove(packet: Packet = null) {
			if (packet) {
				this._scene_rot_pos = new MsgSceneRotPos(packet);
				this._forward = new MsgSceneVector3(packet);
				this._ani_name = packet.ReadString();
				this._x_axis = packet.ReadShort();
				this._uid = packet.ReadUint();
			}
		}


		public function get scene_rot_pos(): MsgSceneRotPos { return this._scene_rot_pos; }
		public function set scene_rot_pos(value: MsgSceneRotPos): void { this._scene_rot_pos = value; }
		public function get forward(): MsgSceneVector3 { return this._forward; }
		public function set forward(value: MsgSceneVector3): void { this._forward = value; }
		public function get ani_name(): String { return this._ani_name; }
		public function set ani_name(value: String): void { this._ani_name = value; }
		public function get x_axis(): int { return this._x_axis; }
		public function set x_axis(value: int): void { this._x_axis = value; }
		public function get uid(): uint { return this._uid; }
		public function set uid(value: uint): void { this._uid = value; }
	}
}
