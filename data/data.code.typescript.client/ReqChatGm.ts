namespace proto {
export class ReqChatGm
{
	private _content: string;


	public Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
		packet.WriteString(this._content);
		packet.Encode(1530);
		return packet;
	}


	public get content(): string { return this._content; }
	public set content(value: string) { this._content = value; }
}
}
