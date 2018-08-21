namespace proto {
export class MsgSceneVector3
{
	private _x: number;
	private _y: number;
	private _z: number;


	public Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
		packet.WriteShort(this._x);
		packet.WriteShort(this._y);
		packet.WriteShort(this._z);
		return packet;
	}


	constructor(packet: game.util.Packet) {
		this._x = packet.ReadShort();
		this._y = packet.ReadShort();
		this._z = packet.ReadShort();
	}

	public GetBuffer(): ByteBuffer
	{
		return this.Encode().GetBuffer();
	}


	public get x(): number { return this._x; }
	public set x(value: number) { this._x = value; }
	public get y(): number { return this._y; }
	public set y(value: number) { this._y = value; }
	public get z(): number { return this._z; }
	public set z(value: number) { this._z = value; }
}
}
