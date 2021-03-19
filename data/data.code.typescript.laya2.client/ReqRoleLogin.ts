import Packet from './Packet'


export default class ReqRoleLogin
{
	private _uid: number;
	private _uuid: number;
	private _sid: number;
	private _cid: number;
	private _login_time: number;
	private _pwd: string;
	private _relink: number;
	private _debug: number;
	private _os: string;
	private _version: string;


	public Encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteUint(this._uid);
		packet.WriteUint(this._uuid);
		packet.WriteUshort(this._sid);
		packet.WriteUshort(this._cid);
		packet.WriteUint(this._login_time);
		packet.WriteString(this._pwd);
		packet.WriteByte(this._relink);
		packet.WriteByte(this._debug);
		packet.WriteString(this._os);
		packet.WriteString(this._version);
		packet.Encode(1010);
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
	public get login_time(): number { return this._login_time; }
	public set login_time(value: number) { this._login_time = value; }
	public get pwd(): string { return this._pwd; }
	public set pwd(value: string) { this._pwd = value; }
	public get relink(): number { return this._relink; }
	public set relink(value: number) { this._relink = value; }
	public get debug(): number { return this._debug; }
	public set debug(value: number) { this._debug = value; }
	public get os(): string { return this._os; }
	public set os(value: string) { this._os = value; }
	public get version(): string { return this._version; }
	public set version(value: string) { this._version = value; }
}
