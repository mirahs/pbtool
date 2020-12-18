import Packet from '@mi/mod/Packet'


export default class AckChatSendOk
{
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


	public get channel(): number { return this._channel; }
	public set channel(value: number) { this._channel = value; }
	public get uid(): number { return this._uid; }
	public set uid(value: number) { this._uid = value; }
	public get uname(): string { return this._uname; }
	public set uname(value: string) { this._uname = value; }
	public get content(): string { return this._content; }
	public set content(value: string) { this._content = value; }
}
