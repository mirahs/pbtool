package proto {
	public class ReqSceneReqPlayers {


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.Encode(2070);
			return packet;
		}



	}
}
