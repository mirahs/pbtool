package proto {
	public class ReqRoleRandName {


		public function Encode(): Packet {
			var packet: Packet = new Packet();
			packet.Encode(1030);
			return packet;
		}



	}
}
