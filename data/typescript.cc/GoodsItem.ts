import Packet from "@mi/mod/Packet"



export default class GoodsItem
{
	private _id: number;
	private _num: number;


	public Encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteUint(this._id);
		packet.WriteUshort(this._num);
		packet.Encode(3010);
		return packet;
	}


	public GetBuffer(): ByteBuffer
	{
		return this.Encode().GetBuffer();
	}


	constructor(packet?: Packet) {
		if (packet) {
			this._id = packet.ReadUint();
			this._num = packet.ReadUshort();
		}
	}


	public get id(): number { return this._id; }
	public set id(value: number) { this._id = value; }
	public get num(): number { return this._num; }
	public set num(value: number) { this._num = value; }
}
