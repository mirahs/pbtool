import Packet from './Packet'


export default class AckRoleLoginOk
{
	private _uname: string;


	constructor(packet?: Packet) {
		if (packet) {
			this._uname = packet.ReadString();
		}
	}


	public get uname(): string { return this._uname; }
	public set uname(value: string) { this._uname = value; }
}
