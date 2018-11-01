package proto {
	public class AckSceneEnter {
		private _player: MsgScenePlayer;


		constructor(packet: Packet = null) {
			if (packet) {
				this._player = new MsgScenePlayer(packet);
			}
		}


		public function get player(): MsgScenePlayer { return this._player; }
		public function set player(value: MsgScenePlayer) { this._player = value; }
	}
}
