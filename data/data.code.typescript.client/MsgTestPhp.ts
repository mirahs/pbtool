namespace proto {
export class MsgTestPhp
{
	private _u16: number;


	public Encode(): net.Packet {
		let packet: net.Packet = new net.Packet();
		packet.WriteUshort(this._u16);
		return packet;
	}


	constructor(packet: net.Packet) {
		this._u16 = packet.ReadUshort();
	}

	public GetBuffer(): ByteBuffer
	{
		return this.Encode().GetBuffer();
	}


	public get u16(): number { return this._u16; }
	public set u16(value: number) { this._u16 = value; }
}
}
