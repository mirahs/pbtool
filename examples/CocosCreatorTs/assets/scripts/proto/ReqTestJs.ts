import Packet from '@mi/mod/Packet'


export default class ReqTestJs
{
	private _u64: Long;
	private _i64: Long;


	public Encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteUlong(this._u64);
		packet.WriteLong(this._i64);
		packet.Encode(40080);
		return packet;
	}


	public get u64(): Long { return this._u64; }
	public set u64(value: Long) { this._u64 = value; }
	public get i64(): Long { return this._i64; }
	public set i64(value: Long) { this._i64 = value; }
}
