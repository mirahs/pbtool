import Packet from '../net/Packet'


export default class MsgTestPhp
{
	private _u16: number;


	public Encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteUshort(this._u16);
		return packet;
	}


	constructor(packet?: Packet) {
		if (packet) {
			this._u16 = packet.ReadUshort();
		}
	}

	public GetBuffer(): Laya.Byte
	{
		return this.Encode().GetBuffer();
	}


	public get u16(): number { return this._u16; }
	public set u16(value: number) { this._u16 = value; }
}
