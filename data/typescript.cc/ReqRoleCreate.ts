import Packet from '@mi/mod/Packet'


export default class ReqRoleCreate
{
	private _uid: number;
	private _uuid: number;
	private _sid: number;
	private _cid: number;
	private _os: string;
	private _version: string;
	private _uname: string;
	private _source: string;
	private _source_sub: string;
	private _login_time: number;


	public Encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteUint(this._uid);
		packet.WriteUint(this._uuid);
		packet.WriteUshort(this._sid);
		packet.WriteUshort(this._cid);
		packet.WriteString(this._os);
		packet.WriteString(this._version);
		packet.WriteString(this._uname);
		packet.WriteString(this._source);
		packet.WriteString(this._source_sub);
		packet.WriteUint(this._login_time);
		packet.Encode(1020);
		return packet;
	}


	public get uid(): number { return this._uid; }
	public set uid(value: number) { this._uid = value; }
	public get uuid(): number { return this._uuid; }
	public set uuid(value: number) { this._uuid = value; }
	public get sid(): number { return this._sid; }
	public set sid(value: number) { this._sid = value; }
	public get cid(): number { return this._cid; }
	public set cid(value: number) { this._cid = value; }
	public get os(): string { return this._os; }
	public set os(value: string) { this._os = value; }
	public get version(): string { return this._version; }
	public set version(value: string) { this._version = value; }
	public get uname(): string { return this._uname; }
	public set uname(value: string) { this._uname = value; }
	public get source(): string { return this._source; }
	public set source(value: string) { this._source = value; }
	public get source_sub(): string { return this._source_sub; }
	public set source_sub(value: string) { this._source_sub = value; }
	public get login_time(): number { return this._login_time; }
	public set login_time(value: number) { this._login_time = value; }
}
