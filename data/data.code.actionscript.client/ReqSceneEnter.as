package proto {
	public class ReqSceneEnter {
		private _door_id: Number;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteUint(this._door_id);
			packet.Encode(2020);
			return packet;
		}


		public function get door_id(): Number { return this._door_id; }
		public function set door_id(value: Number) { this._door_id = value; }
	}
}
