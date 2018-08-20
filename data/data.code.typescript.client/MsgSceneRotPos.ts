namespace proto {
export class MsgSceneRotPos
{
	private _rot_x: number;
	private _rot_y: number;
	private _rot_z: number;
	private _pos_x: number;
	private _pos_y: number;
	private _pos_z: number;


	public Encode(): net.Packet {
		let packet: net.Packet = new net.Packet();
		packet.WriteShort(this._rot_x);
		packet.WriteShort(this._rot_y);
		packet.WriteShort(this._rot_z);
		packet.WriteShort(this._pos_x);
		packet.WriteShort(this._pos_y);
		packet.WriteShort(this._pos_z);
		return packet;
	}


	constructor(packet: net.Packet) {
		this._rot_x = packet.ReadShort();
		this._rot_y = packet.ReadShort();
		this._rot_z = packet.ReadShort();
		this._pos_x = packet.ReadShort();
		this._pos_y = packet.ReadShort();
		this._pos_z = packet.ReadShort();
	}

	public GetBuffer(): ByteBuffer
	{
		return this.Encode().GetBuffer();
	}


	public get rot_x(): number { return this._rot_x; }
	public set rot_x(value: number) { this._rot_x = value; }
	public get rot_y(): number { return this._rot_y; }
	public set rot_y(value: number) { this._rot_y = value; }
	public get rot_z(): number { return this._rot_z; }
	public set rot_z(value: number) { this._rot_z = value; }
	public get pos_x(): number { return this._pos_x; }
	public set pos_x(value: number) { this._pos_x = value; }
	public get pos_y(): number { return this._pos_y; }
	public set pos_y(value: number) { this._pos_y = value; }
	public get pos_z(): number { return this._pos_z; }
	public set pos_z(value: number) { this._pos_z = value; }
}
}
