import Packet from '@mi/mod/Packet'


export default class ReqChatSend
{
	private _channel: number;
	private _dest_uid: number;
	private _content: string;


	public Encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteByte(this._channel);
		packet.WriteUint(this._dest_uid);
		packet.WriteString(this._content);
		packet.Encode(1510);
		return packet;
	}


	public get channel(): number { return this._channel; }
	public set channel(value: number) { this._channel = value; }
	public get dest_uid(): number { return this._dest_uid; }
	public set dest_uid(value: number) { this._dest_uid = value; }
	public get content(): string { return this._content; }
	public set content(value: string) { this._content = value; }
}
