import { Packet } from '@mi/mod/Packet'


export class AckSceneExit
{
	private _uid: number;


	constructor(packet?: Packet) {
		if (packet) {
			this._uid = packet.ReadUint();
		}
	}


	public get uid(): number { return this._uid; }
	public set uid(value: number) { this._uid = value; }
}
