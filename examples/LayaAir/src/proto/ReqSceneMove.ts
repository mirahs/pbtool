namespace proto {
export class ReqSceneMove
{
	private _scene_rot_pos: MsgSceneRotPos;
	private _forward: MsgSceneVector3;
	private _ani_name: string;
	private _x_axis: number;


	public Encode(): net.Packet {
		let packet: net.Packet = new net.Packet();
		packet.WriteBuffer(this._scene_rot_pos.GetBuffer());
		packet.WriteBuffer(this._forward.GetBuffer());
		packet.WriteString(this._ani_name);
		packet.WriteShort(this._x_axis);
		packet.Encode(2030);
		return packet;
	}


	public get scene_rot_pos(): MsgSceneRotPos { return this._scene_rot_pos; }
	public set scene_rot_pos(value: MsgSceneRotPos) { this._scene_rot_pos = value; }
	public get forward(): MsgSceneVector3 { return this._forward; }
	public set forward(value: MsgSceneVector3) { this._forward = value; }
	public get ani_name(): string { return this._ani_name; }
	public set ani_name(value: string) { this._ani_name = value; }
	public get x_axis(): number { return this._x_axis; }
	public set x_axis(value: number) { this._x_axis = value; }
}
}
