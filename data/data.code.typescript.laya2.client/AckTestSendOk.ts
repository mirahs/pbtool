import Packet from './Packet'
import MsgRoleBase from './MsgRoleBase'


export default class AckTestSendOk
{
	private _id_u8: number;
	private _role_base: MsgRoleBase;
	private _id_f32: number[] = [];
	private id_op_u8_flag: number = 0;
	private _id_op_u8: number;
	private op_role_base_flag: number = 0;
	private _op_role_base: MsgRoleBase;


	constructor(packet?: Packet) {
		if (packet) {
			this._id_u8 = packet.ReadByte();
			this._role_base = new MsgRoleBase(packet);
			this._id_f32 = [];
			let id_f32_count: number = packet.ReadUshort();
			for (var i: number = 0; i < id_f32_count; i++)
			{
				this._id_f32.push(packet.ReadFloat());
			}
			this. id_op_u8_flag = packet.ReadByte();
			if (this.id_op_u8_flag == 1)
			{
				this._id_op_u8 = packet.ReadByte();
			}
			this. op_role_base_flag = packet.ReadByte();
			if (this.op_role_base_flag == 1)
			{
				this._op_role_base = new MsgRoleBase(packet);
			}
		}
	}


	public get id_u8(): number { return this._id_u8; }
	public set id_u8(value: number) { this._id_u8 = value; }
	public get role_base(): MsgRoleBase { return this._role_base; }
	public set role_base(value: MsgRoleBase) { this._role_base = value; }
	public get id_f32(): number[] {return this._id_f32; }
	public set id_f32(value: number[]) { this._id_f32 = value; }
	public get id_op_u8(): number { return this._id_op_u8; }
	public set id_op_u8(value: number) { this.id_op_u8_flag = 1; this._id_op_u8 = value; }
	public get op_role_base(): MsgRoleBase { return this._op_role_base; }
	public set op_role_base(value: MsgRoleBase) { this.op_role_base_flag = 1; this._op_role_base = value; }
}
