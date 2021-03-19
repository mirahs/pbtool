import Packet from './Packet'


export default class ReqSceneReqPlayers
{


	public Encode(): Packet {
		let packet: Packet = new Packet();
		packet.Encode(2070);
		return packet;
	}



}
