package proto {
	public class AckSceneExit {
		private _uid: number;


		constructor(packet?: game.util.Packet) {
			if (packet) {
				this._uid = packet.ReadUint();
			}
		}


		public function get uid(): number { return this._uid; }
		public function set uid(value: number) { this._uid = value; }
	}
}
