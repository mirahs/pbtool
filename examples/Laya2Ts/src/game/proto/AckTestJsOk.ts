import Packet from '../net/Packet'


export default class AckTestJsOk
{
	private _u64: number;
	private _i64: number;


	constructor(packet?: Packet) {
		if (packet) {
			this._u64 = packet.ReadUlong();
			this._i64 = packet.ReadLong();
		}
	}


	public get u64(): number { return this._u64; }
	public set u64(value: number) { this._u64 = value; }
	public get i64(): number { return this._i64; }
	public set i64(value: number) { this._i64 = value; }
}
