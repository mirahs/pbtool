package com.data {
	public class ReqSceneEnterFly {
		private _map_id: Number;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteUint(this._map_id);
			packet.Encode(2010);
			return packet;
		}


		public function get map_id(): Number { return this._map_id; }
		public function set map_id(value: Number) { this._map_id = value; }
	}
}
