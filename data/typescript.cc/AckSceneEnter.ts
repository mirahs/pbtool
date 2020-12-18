import Packet from '@mi/mod/Packet'
import MsgScenePlayer from './MsgScenePlayer'


export default class AckSceneEnter
{
	private _player: MsgScenePlayer;


	constructor(packet?: Packet) {
		if (packet) {
			this._player = new MsgScenePlayer(packet);
		}
	}


	public get player(): MsgScenePlayer { return this._player; }
	public set player(value: MsgScenePlayer) { this._player = value; }
}
