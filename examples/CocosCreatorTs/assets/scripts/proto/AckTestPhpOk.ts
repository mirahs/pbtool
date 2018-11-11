import { Packet } from '@mi/mod/Packet'
import { MsgTestPhp } from './MsgTestPhp'


export class AckTestPhpOk
{
	private _u64: Long;
	private _strxx: string;
	private _msg_req: MsgTestPhp;
	private msg_opt_flag: number = 0;
	private _msg_opt: MsgTestPhp;
	private _msg_rep: MsgTestPhp[] = [];


	constructor(packet?: Packet) {
		if (packet) {
			this._u64 = packet.ReadUlong();
			this._strxx = packet.ReadString();
			this._msg_req = new MsgTestPhp(packet);
			this. msg_opt_flag = packet.ReadByte();
			if (this.msg_opt_flag == 1)
			{
				this._msg_opt = new MsgTestPhp(packet);
			}
			this._msg_rep = [];
			let msg_rep_count: number = packet.ReadUshort();
			for (var i: number = 0; i < msg_rep_count; i++)
			{
				this._msg_rep.push(new MsgTestPhp(packet));
			}
		}
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
