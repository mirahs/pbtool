import Packet from '../net/Packet';


export default class RoleLogin {
	private _account: string;
	private _password: string;

	constructor(packet?: Packet) {
		if (packet) {
			this._account = packet.ReadString();
			this._password = packet.ReadString();
		}
	}

	public Encode(): Packet {
		const packet = this._encode();
		packet.Encode(1010);
		return packet;
	}

	public GetBuffer(): ByteBuffer {
		return this._encode().GetBuffer();
	}

	private _encode(): Packet {
		let packet: Packet = new Packet();
		packet.WriteString(this._account);
		packet.WriteString(this._password);
		return packet;
	}

	public get account(): string { return this._account; }
	public set account(value: string) { this._account = value; }
	public get password(): string { return this._password; }
	public set password(value: string) { this._password = value; }
}
