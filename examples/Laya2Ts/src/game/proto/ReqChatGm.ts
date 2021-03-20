import Packet from '../net/Packet'


export default class ReqChatGm
{
	private _content: string;


	public Encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteString(this._content);
		packet.Encode(1530);
		return packet;
	}


	public get content(): string { return this._content; }
	public set content(value: string) { this._content = value; }
}
