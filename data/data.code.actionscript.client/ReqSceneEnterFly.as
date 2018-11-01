package proto {
	public class ReqSceneEnterFly {
		private _map_id: number;


		public function Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
			packet.WriteUint(this._map_id);
			packet.Encode(2010);
			return packet;
	}


		public function get map_id(): number { return this._map_id; }
		public function set map_id(value: number) { this._map_id = value; }
	}
}
