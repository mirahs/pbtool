import Packet from '../net/Packet'


export default class ReqRoleRandName
{


	public Encode(): Packet {
		let packet: Packet = new Packet();
		packet.Encode(1030);
		return packet;
	}



}
