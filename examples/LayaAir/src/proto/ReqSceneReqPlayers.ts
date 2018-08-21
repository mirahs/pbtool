namespace proto {
export class ReqSceneReqPlayers
{


	public Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
		packet.Encode(2070);
		return packet;
	}



}
}
