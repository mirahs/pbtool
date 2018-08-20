namespace proto {
export class ReqSceneEnterFly
{
	private _map_id: number;


	public Encode(): net.Packet {
		let packet: net.Packet = new net.Packet();
		packet.WriteUint(this._map_id);
		packet.Encode(2010);
		return packet;
	}


	public get map_id(): number { return this._map_id; }
	public set map_id(value: number) { this._map_id = value; }
}
}
