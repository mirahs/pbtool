namespace proto {
export class AckRoleLoginOk
{
	private _uname: string;


	constructor(packet: net.Packet) {
		this._uname = packet.ReadString();
	}


	public get uname(): string { return this._uname; }
	public set uname(value: string) { this._uname = value; }
}
}
