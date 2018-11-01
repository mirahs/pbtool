package proto {
	public class ReqSceneEnter {
		private _door_id: number;


		public function Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
			packet.WriteUint(this._door_id);
			packet.Encode(2020);
			return packet;
	}


		public function get door_id(): number { return this._door_id; }
		public function set door_id(value: number) { this._door_id = value; }
	}
}
