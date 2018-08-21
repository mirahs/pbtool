namespace proto {
export class AckTestXX
{
	private _id_u8: number;
	private _id_u16: number;
	private _id_u32: number;
	private _repeat_id_u8: number[] = [];
	private optional_id_u8_flag: number = 0;
	private _optional_id_u8: number;


	constructor(packet: game.util.Packet) {
		this._id_u8 = packet.ReadByte();
		this._id_u16 = packet.ReadUshort();
		this._id_u32 = packet.ReadUint();
		this._repeat_id_u8 = [];
		let repeat_id_u8_count: number = packet.ReadUshort();
		for (var i: number = 0; i < repeat_id_u8_count; i++)
		{
			this._repeat_id_u8.push(packet.ReadByte());
		}
		this. optional_id_u8_flag = packet.ReadByte();
		if (this.optional_id_u8_flag == 1)
		{
			this._optional_id_u8 = packet.ReadByte();
		}
	}


	public get id_u8(): number { return this._id_u8; }
	public set id_u8(value: number) { this._id_u8 = value; }
	public get id_u16(): number { return this._id_u16; }
	public set id_u16(value: number) { this._id_u16 = value; }
	public get id_u32(): number { return this._id_u32; }
	public set id_u32(value: number) { this._id_u32 = value; }
	public get repeat_id_u8(): number[] {return this._repeat_id_u8; }
	public set repeat_id_u8(value: number[]) { this._repeat_id_u8 = value; }
	public get optional_id_u8(): number { return this._optional_id_u8; }
	public set optional_id_u8(value: number) { this.optional_id_u8_flag = 1; this._optional_id_u8 = value; }
}
}
