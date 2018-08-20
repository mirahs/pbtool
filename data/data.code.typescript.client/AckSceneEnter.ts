namespace proto {
export class AckSceneEnter
{
	private _player: MsgScenePlayer;


	constructor(packet: net.Packet) {
		this._player = new MsgScenePlayer(packet);
	}


	public get player(): MsgScenePlayer { return this._player; }
	public set player(value: MsgScenePlayer) { this._player = value; }
}
}
