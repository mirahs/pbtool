import { Packet } from '@mi/mod/Packet'


export class ReqSceneEnter
{
	private _door_id: number;


	public Encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteUint(this._door_id);
		packet.Encode(2020);
		return packet;
	}


	public get door_id(): number { return this._door_id; }
	public set door_id(value: number) { this._door_id = value; }
}
