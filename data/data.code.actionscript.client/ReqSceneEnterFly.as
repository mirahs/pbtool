package com.data {
	public class ReqSceneEnterFly {
		private _map_id: uint;


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.WriteUint(this._map_id);
			packet.Encode(2010);
			return packet;
		}


		public function get map_id(): uint { return this._map_id; }
		public function set map_id(value: uint) { this._map_id = value; }
	}
}
