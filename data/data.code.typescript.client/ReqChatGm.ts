namespace proto {
export class ReqChatGm
{
	private _content: string;


	public Encode(): net.Packet {
		let packet: net.Packet = new net.Packet();
		packet.WriteString(this._content);
		packet.Encode(1530);
		return packet;
	}


	public get content(): string { return this._content; }
	public set content(value: string) { this._content = value; }
}
}
