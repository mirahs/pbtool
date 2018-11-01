package proto {
	public class AckScenePlayers {
		private _players: MsgScenePlayer[] = [];


		constructor(packet?: game.util.Packet) {
			if (packet) {
				this._players = [];
				let players_count: number = packet.ReadUshort();
				for (var i: number = 0; i < players_count; i++)
		{
					this._players.push(new MsgScenePlayer(packet));
		}
			}
		}


		public function get players(): MsgScenePlayer[] {return this._players; }
		public function set players(value: MsgScenePlayer[]) { this._players = value; }
	}
}
