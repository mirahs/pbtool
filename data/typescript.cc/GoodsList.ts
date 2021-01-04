import Packet from "@mi/mod/Packet";
import GoodsItem from './GoodsItem';


export default class GoodsList {
	private _goods: GoodsItem[] = [];

	constructor(packet?: Packet) {
		if (packet) {
			this._goods = [];
			let goods_count: number = packet.ReadUshort();
			for (let i: number = 0; i < goods_count; i++) {
				this._goods.push(new GoodsItem(packet));
			}
		}
	}

	public Encode(): Packet {
		let packet: Packet = new Packet();
		let goods_count: number = this._goods.length;
		packet.WriteUshort(goods_count);
		for (let i: number = 0; i < goods_count; i++) {
			let xxx: GoodsItem = this._goods[i];
			packet.WriteBuffer(xxx.GetBuffer());
		}
		packet.Encode(3020);
		return packet;
	}

	public GetBuffer(): ByteBuffer {
		return this.Encode().GetBuffer();
	}

	public get goods(): GoodsItem[] {return this._goods; }
	public set goods(value: GoodsItem[]) { this._goods = value; }
}
