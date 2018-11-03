namespace proto {
export class ReqRoleRandName
{


	public Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
		packet.Encode(1030);
		return packet;
	}



}
}
