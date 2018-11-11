import { Packet } from '@mi/mod/Packet'
import { MsgSceneRotPos } from './MsgSceneRotPos'
import { MsgSceneVector3 } from './MsgSceneVector3'


export class AckSceneMove
{
	private _scene_rot_pos: MsgSceneRotPos;
	private _forward: MsgSceneVector3;
	private _ani_name: string;
	private _x_axis: number;
	private _uid: number;


	constructor(packet?: Packet) {
		if (packet) {
			this._scene_rot_pos = new MsgSceneRotPos(packet);
			this._forward = new MsgSceneVector3(packet);
			this._ani_name = packet.ReadString();
			this._x_axis = packet.ReadShort();
			this._uid = packet.ReadUint();
		}
	}


	public get scene_rot_pos(): MsgSceneRotPos { return this._scene_rot_pos; }
	public set scene_rot_pos(value: MsgSceneRotPos) { this._scene_rot_pos = value; }
	public get forward(): MsgSceneVector3 { return this._forward; }
	public set forward(value: MsgSceneVector3) { this._forward = value; }
	public get ani_name(): string { return this._ani_name; }
	public set ani_name(value: string) { this._ani_name = value; }
	public get x_axis(): number { return this._x_axis; }
	public set x_axis(value: number) { this._x_axis = value; }
	public get uid(): number { return this._uid; }
	public set uid(value: number) { this._uid = value; }
}
