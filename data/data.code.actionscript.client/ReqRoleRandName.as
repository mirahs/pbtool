package proto {
	public class ReqRoleRandName {


		public function Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
			packet.Encode(1030);
			return packet;
	}



	}
}
