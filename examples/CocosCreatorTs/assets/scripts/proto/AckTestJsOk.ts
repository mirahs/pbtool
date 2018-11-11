import Packet from '@mi/mod/Packet'


export default class AckTestJsOk
{
	private _u64: Long;
	private _i64: Long;


	constructor(packet?: Packet) {
		if (packet) {
			this._u64 = packet.ReadUlong();
			this._i64 = packet.ReadLong();
		}
	}


	public get u64(): Long { return this._u64; }
	public set u64(value: Long) { this._u64 = value; }
	public get i64(): Long { return this._i64; }
	public set i64(value: Long) { this._i64 = value; }
}
