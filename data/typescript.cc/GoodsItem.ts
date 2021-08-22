import Packet from '../net/Packet';


// 物品数据
export default class GoodsItem {
	private _id: number = 0; //物品ID
	private _num: number = 0; //物品数量

	constructor(packet?: Packet) {
		if (packet) {
			this._id = packet.ReadUint();
			this._num = packet.ReadUshort();
		}
	}

	public Encode(): Packet {
		const packet = this._encode();
		packet.Encode(2010);
		return packet;
	}

	public GetBuffer(): ByteBuffer {
		return this._encode().GetBuffer();
	}

	private _encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteUint(this._id);
		packet.WriteUshort(this._num);
		return packet;
	}

	public get id(): number { return this._id; }
	public set id(value: number) { this._id = value; }
	public get num(): number { return this._num; }
	public set num(value: number) { this._num = value; }
}
