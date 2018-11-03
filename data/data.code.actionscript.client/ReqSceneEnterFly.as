package proto {
	import laya.utils.Byte;
	public class ReqSceneEnterFly {
		private var _map_id: uint;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteUint(this._map_id);
			packet.Encode(2010);
			return packet;
		}


		public function get map_id(): uint { return this._map_id; }
		public function set map_id(value: uint): void { this._map_id = value; }
	}
}
