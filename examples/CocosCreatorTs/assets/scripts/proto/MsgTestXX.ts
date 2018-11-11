import { Packet } from '@mi/mod/Packet'


export class MsgTestXX
{
	private _id_u8: number;
	private _id_f32: number[] = [];
	private id_op_u8_flag: number = 0;
	private _id_op_u8: number;


	public Encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteByte(this._id_u8);
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
		return packet;
	}


	constructor(packet?: Packet) {
		if (packet) {
			this._id_u8 = packet.ReadByte();
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
		}
	}

	public GetBuffer(): ByteBuffer
	{
		return this.Encode().GetBuffer();
	}


	public get id_u8(): number { return this._id_u8; }
	public set id_u8(value: number) { this._id_u8 = value; }
	public get id_f32(): number[] {return this._id_f32; }
	public set id_f32(value: number[]) { this._id_f32 = value; }
	public get id_op_u8(): number { return this._id_op_u8; }
	public set id_op_u8(value: number) { this.id_op_u8_flag = 1; this._id_op_u8 = value; }
}
