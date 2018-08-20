namespace proto {
export class ReqRoleRandName
{


	public Encode(): net.Packet {
		let packet: net.Packet = new net.Packet();
		packet.Encode(1030);
		return packet;
	}



}
}
