package com.data {
	public class AckScenePlayers {
		private _players: Array = [];


		public function AckScenePlayers(packet: Packet = null) {
			if (packet) {
				this._players = [];
				var players_count: Number = packet.ReadUshort();
				for (var i: Number = 0; i < players_count; i++)
				{
					this._players.push(new MsgScenePlayer(packet));
				}
			}
		}


		public function get players(): Array {return this._players; }
		public function set players(value: Array) { this._players = value; }
	}
}
