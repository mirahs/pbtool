import Packet from "@mi/mod/Packet";


export default class ChatGm {
	private _content: string;

	constructor(packet?: Packet) {
		if (packet) {
			this._content = packet.ReadString();
		}
	}

	public Encode(): Packet {
		const packet = this._encode();
		packet.Encode(2030);
		return packet;
	}

	public GetBuffer(): ByteBuffer {
		return this._encode().GetBuffer();
	}

	private _encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteString(this._content);
		return packet;
	}

	public get content(): string { return this._content; }
	public set content(value: string) { this._content = value; }
}
