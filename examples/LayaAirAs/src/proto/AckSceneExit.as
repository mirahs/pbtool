package proto {
	public class AckSceneExit {
		private var _uid: uint;


		public function AckSceneExit(packet: Packet = null) {
			if (packet) {
				this._uid = packet.ReadUint();
			}
		}


		public function get uid(): uint { return this._uid; }
		public function set uid(value: uint): void { this._uid = value; }
	}
}
