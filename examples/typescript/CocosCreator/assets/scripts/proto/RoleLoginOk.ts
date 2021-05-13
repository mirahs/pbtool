import Packet from '../net/Packet';
import GoodsItem from './GoodsItem';


export default class RoleLoginOk {
	private _uid: number = 0;
	private _uname: string = "";
	private _goods_item: GoodsItem[] = [];

	constructor(packet?: Packet) {
		if (packet) {
			this._uid = packet.ReadUint();
			this._uname = packet.ReadString();
			this._goods_item = [];
			let goods_item_count: number = packet.ReadUshort();
			for (let i: number = 0; i < goods_item_count; i++) {
				this._goods_item.push(new GoodsItem(packet));
			}
		}
	}

	public Encode(): Packet {
		const packet = this._encode();
		packet.Encode(1020);
		return packet;
	}

	public GetBuffer(): ByteBuffer {
		return this._encode().GetBuffer();
	}

	private _encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteUint(this._uid);
		packet.WriteString(this._uname);
		let goods_item_count: number = this._goods_item.length;
		packet.WriteUshort(goods_item_count);
		for (let i: number = 0; i < goods_item_count; i++) {
			let xxx: GoodsItem = this._goods_item[i];
			packet.WriteBuffer(xxx.GetBuffer());
		}
		return packet;
	}

	public get uid(): number { return this._uid; }
	public set uid(value: number) { this._uid = value; }
	public get uname(): string { return this._uname; }
	public set uname(value: string) { this._uname = value; }
	public get goods_item(): GoodsItem[] {return this._goods_item; }
	public set goods_item(value: GoodsItem[]) { this._goods_item = value; }
}
