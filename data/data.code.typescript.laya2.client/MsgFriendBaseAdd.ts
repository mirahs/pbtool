import Packet from './Packet'


export default class MsgFriendBaseAdd
{
	private _uid: number;
	private _uname: string;


	public Encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteUint(this._uid);
		packet.WriteString(this._uname);
		return packet;
	}


	constructor(packet?: Packet) {
		if (packet) {
			this._uid = packet.ReadUint();
			this._uname = packet.ReadString();
		}
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
