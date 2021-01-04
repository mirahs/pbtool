import Packet from "@mi/mod/Packet"



export default class ChatSend
{
	private _channel: number;
	private _content: string;
	private dest_uid_flag: number = 0;
	private _dest_uid: number;


	public Encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteByte(this._channel);
		packet.WriteString(this._content);
		packet.WriteByte(this.dest_uid_flag);
		if (this.dest_uid_flag == 1)
		{
			packet.WriteUint(this._dest_uid);
		}
		packet.Encode(2010);
		return packet;
	}


	public GetBuffer(): ByteBuffer
	{
		return this.Encode().GetBuffer();
	}


	constructor(packet?: Packet) {
		if (packet) {
			this._channel = packet.ReadByte();
			this._content = packet.ReadString();
			this. dest_uid_flag = packet.ReadByte();
			if (this.dest_uid_flag == 1)
			{
				this._dest_uid = packet.ReadUint();
			}
		}
	}


	public get channel(): number { return this._channel; }
	public set channel(value: number) { this._channel = value; }
	public get content(): string { return this._content; }
	public set content(value: string) { this._content = value; }
	public get dest_uid(): number { return this._dest_uid; }
	public set dest_uid(value: number) { this.dest_uid_flag = 1; this._dest_uid = value; }
}
