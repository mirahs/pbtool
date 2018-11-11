import { Packet } from '@mi/mod/Packet'
import { MsgTestPhp } from './MsgTestPhp'


export class ReqTestPhp
{
	private _u64: Long;
	private _strxx: string;
	private _msg_req: MsgTestPhp;
	private msg_opt_flag: number = 0;
	private _msg_opt: MsgTestPhp;
	private _msg_rep: MsgTestPhp[] = [];


	public Encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteUlong(this._u64);
		packet.WriteString(this._strxx);
		packet.WriteBuffer(this._msg_req.GetBuffer());
		packet.WriteByte(this.msg_opt_flag);
		if (this.msg_opt_flag == 1)
		{
			packet.WriteBuffer(this._msg_opt.GetBuffer());
		}
		let msg_rep_count: number = this._msg_rep.length;
		packet.WriteUshort(msg_rep_count);
		for (var i: number = 0; i < msg_rep_count; i++)
		{
			let xxx: MsgTestPhp = this._msg_rep[i];
			packet.WriteBuffer(xxx.GetBuffer());
		}
		packet.Encode(40060);
		return packet;
	}


	public get u64(): Long { return this._u64; }
	public set u64(value: Long) { this._u64 = value; }
	public get strxx(): string { return this._strxx; }
	public set strxx(value: string) { this._strxx = value; }
	public get msg_req(): MsgTestPhp { return this._msg_req; }
	public set msg_req(value: MsgTestPhp) { this._msg_req = value; }
	public get msg_opt(): MsgTestPhp { return this._msg_opt; }
	public set msg_opt(value: MsgTestPhp) { this.msg_opt_flag = 1; this._msg_opt = value; }
	public get msg_rep(): MsgTestPhp[] {return this._msg_rep; }
	public set msg_rep(value: MsgTestPhp[]) { this._msg_rep = value; }
}
