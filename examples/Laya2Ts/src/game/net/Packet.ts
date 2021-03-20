export default class Packet {
	public packetId: number = 0;

	private _byte: Laya.Byte;


	public Packet(buffer: ArrayBuffer = null): void {
		this._byte = new Laya.Byte(buffer);
		this._byte.pos = 0;
		this._byte.endian = Laya.Byte.BIG_ENDIAN; //设置为大端；
	}


	public Encode(packetId: number): void {
		this.packetId = packetId;
		var all: Laya.Byte = new Laya.Byte(4 + this._byte.length);
		all.endian = Laya.Byte.BIG_ENDIAN; //设置为大端；
		all.writeUint16(this._byte.length + 2);
		all.writeUint16(packetId);
		all.writeArrayBuffer(this._byte.buffer);
		this._byte = all;
	}

	public Buffer(): ArrayBuffer {
		return this._byte.buffer
	}

	public GetBuffer(): Laya.Byte {
		return this._byte;
	}

	public WriteBuffer(v: Laya.Byte): void {
		this._byte.writeArrayBuffer(v.buffer, 0);
	}

	public Reset(): void {
		this._byte.pos = 0;
	}


	public WriteByte(v: number): void {
		this._byte.writeByte(v);
	}

	public WriteSbyte(v: number): void {
		this._byte.writeUint8(v);
	}

	public WriteUshort(v: number): void {
		this._byte.writeUint16(v);
	}

	public WriteShort(v: number): void {
		this._byte.writeInt16(v);
	}

	public WriteUint(v: number): void {
		this._byte.writeUint32(v);
	}

	public WriteInt(v: number): void {
		this._byte.writeInt32(v);
	}

	public WriteUlong(v: number): void {
		const zeros: String = "00000000";
		var str: String = v.toString(16);
		str = zeros.substr(0, 16 - str.length) + str;
		this.WriteUint(parseInt(str.substr(0, 8), 16));
		this.WriteUint(parseInt(str.substr(8, 8), 16));
	}

	public WriteLong(v: number): void {
		this.WriteUlong(v);
	}

	public WriteFloat(v: number): void {
		this._byte.writeFloat32(v);
	}

	public WriteDouble(v: number): void {
		this._byte.writeFloat64(v);
	}

	public WriteString(v: string): void {
		this._byte.writeUTFString(v);
	}


	public ReadByte(): number {
		return this._byte.getUint8();
	}

	public ReadSbyte(): number {
		return this._byte.getByte();
	}

	public ReadUshort(): number {
		return this._byte.getUint16();
	}

	public ReadShort(): number {
		return this._byte.getInt16();
	}

	public ReadUint(): number {
		return this._byte.getUint32();
	}

	public ReadInt(): number {
		return this._byte.getInt32();
	}

	public ReadUlong(): number {
		const zeros: string = "00000000";
		var s: string = this.ReadUint().toString(16);
		var str: string = zeros.substr(0, 8 - s.length) + s;
		s = this.ReadUint().toString(16);
		str += zeros.substr(0, 8 - s.length) + s;
		return Number(parseInt(str, 16).toString());
	}

	public ReadLong(): number {
		return this.ReadUlong();
	}

	public ReadFloat(): number {
		return this._byte.getFloat32();
	}

	public ReadDouble(): number {
		return this._byte.getFloat64();
	}

	public ReadString(): string {
		// var len:int = this.ReadUshort();
		// return this._byte.getUTFBytes(len);
		return this._byte.getUTFString();
	}

	
	// //Int64转换成ByteArray
	// public writeInt64(bigInt: number): ArrayBuffer {
	// 	const zeros: string = "00000000";
	// 	var bytes: ArrayBuffer = new ArrayBuffer(0);
	// 	var str: string = bigInt.toString(16);
	// 	str = zeros.substr(0, 16 - str.length) + str;
	// 	bytes.writeUnsignedInt(parseInt(str.substr(0, 8), 16));
	// 	bytes.writeUnsignedInt(parseInt(str.substr(8, 8), 16));
	// 	bytes.position = 0;
	// 	return bytes;
	// }

	// //ByteArray转换成Int64
	// public readInt64(bytes: ArrayBuffer): Number {
	// 	const zeros: string = "00000000";
	// 	var s: string = bytes.readUnsignedInt().toString(16);
	// 	var str: string = zeros.substr(0, 8 - s.length) + s;
	// 	s = bytes.readUnsignedInt().toString(16);
	// 	str += zeros.substr(0, 8 - s.length) + s;
	// 	return Number(parseInt(str, 16).toString());
	// }
}
