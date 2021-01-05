import Packet from '../net/Packet';


export default class ChatSendOk {
	private _channel: number;
	private _uid: number;
	private _uname: string;
	private _content: string;

	constructor(packet?: Packet) {
		if (packet) {
			this._channel = packet.ReadByte();
			this._uid = packet.ReadUint();
			this._uname = packet.ReadString();
			this._content = packet.ReadString();
		}
	}

	public Encode(): Packet {
		const packet = this._encode();
		packet.Encode(2020);
		return packet;
	}

	public GetBuffer(): ByteBuffer {
		return this._encode().GetBuffer();
	}

	private _encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteByte(this._channel);
		packet.WriteUint(this._uid);
		packet.WriteString(this._uname);
		packet.WriteString(this._content);
		return packet;
	}

	public get channel(): number { return this._channel; }
	public set channel(value: number) { this._channel = value; }
	public get uid(): number { return this._uid; }
	public set uid(value: number) { this._uid = value; }
	public get uname(): string { return this._uname; }
	public set uname(value: string) { this._uname = value; }
	public get content(): string { return this._content; }
	public set content(value: string) { this._content = value; }
}
