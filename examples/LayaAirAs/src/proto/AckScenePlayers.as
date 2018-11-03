package proto {
	public class AckScenePlayers {
		private var _players: Array = [];


		public function AckScenePlayers(packet: Packet = null) {
			if (packet) {
				this._players = [];
				var players_count: int = packet.ReadUshort();
				for (var i: int = 0; i < players_count; i++)
				{
					this._players.push(new MsgScenePlayer(packet));
				}
			}
		}


		public function get players(): Array {return this._players; }
		public function set players(value: Array): void { this._players = value; }
	}
}
