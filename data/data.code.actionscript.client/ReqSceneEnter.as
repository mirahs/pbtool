package proto {
	import laya.utils.Byte;
	public class ReqSceneEnter {
		private var _door_id: uint;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteUint(this._door_id);
			packet.Encode(2020);
			return packet;
		}


		public function get door_id(): uint { return this._door_id; }
		public function set door_id(value: uint): void { this._door_id = value; }
	}
}
