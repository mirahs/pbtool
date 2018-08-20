namespace proto {
export class ReqSceneReqPlayers
{


	public Encode(): net.Packet {
		let packet: net.Packet = new net.Packet();
		packet.Encode(2070);
		return packet;
	}



}
}
