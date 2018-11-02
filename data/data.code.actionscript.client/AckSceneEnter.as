package com.data {
	public class AckSceneEnter {
		private var _player: MsgScenePlayer;


		public function AckSceneEnter(packet: Packet = null) {
			if (packet) {
				this._player = new MsgScenePlayer(packet);
			}
		}


		public function get player(): MsgScenePlayer { return this._player; }
		public function set player(value: MsgScenePlayer): void { this._player = value; }
	}
}
