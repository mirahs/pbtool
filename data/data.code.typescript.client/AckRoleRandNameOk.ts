namespace proto {
export class AckRoleRandNameOk
{
	private _uname: string;


	constructor(packet: game.util.Packet) {
		this._uname = packet.ReadString();
	}


	public get uname(): string { return this._uname; }
	public set uname(value: string) { this._uname = value; }
}
}
