namespace proto {
export class MsgFriendBaseAdd
{
	private _uid: number;
	private _uname: string;


	public Encode(): net.Packet {
		let packet: net.Packet = new net.Packet();
		packet.WriteUint(this._uid);
		packet.WriteString(this._uname);
		return packet;
	}


	constructor(packet: net.Packet) {
		this._uid = packet.ReadUint();
		this._uname = packet.ReadString();
	}

	public GetBuffer(): ByteBuffer
	{
		return this.Encode().GetBuffer();
	}


	public get uid(): number { return this._uid; }
	public set uid(value: number) { this._uid = value; }
	public get uname(): string { return this._uname; }
	public set uname(value: string) { this._uname = value; }
}
}
