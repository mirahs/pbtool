namespace proto {
export class MsgTestSend
{
	private _id_u8: number;
	private _role_base: MsgRoleBase;
	private _id_f32: number[] = [];
	private id_op_u8_flag: number = 0;
	private _id_op_u8: number;
	private op_role_base_flag: number = 0;
	private _op_role_base: MsgRoleBase;


	public Encode(): game.util.Packet {
		let packet: game.util.Packet = new game.util.Packet();
		packet.WriteByte(this._id_u8);
		packet.WriteBuffer(this._role_base.GetBuffer());
		let id_f32_count: number = this._id_f32.length;
		packet.WriteUshort(id_f32_count);
		for (var i: number = 0; i < id_f32_count; i++)
		{
			let xxx: number = this._id_f32[i];
			packet.WriteFloat(xxx);
		}
		packet.WriteByte(this.id_op_u8_flag);
		if (this.id_op_u8_flag == 1)
		{
			packet.WriteByte(this._id_op_u8);
		}
		packet.WriteByte(this.op_role_base_flag);
		if (this.op_role_base_flag == 1)
		{
			packet.WriteBuffer(this._op_role_base.GetBuffer());
		}
		return packet;
	}


	constructor(packet: game.util.Packet) {
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

	public GetBuffer(): ByteBuffer
	{
		return this.Encode().GetBuffer();
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
}
