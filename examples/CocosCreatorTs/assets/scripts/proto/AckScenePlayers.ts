import { Packet } from '@mi/mod/Packet'
import { MsgScenePlayer } from './MsgScenePlayer'


export class AckScenePlayers
{
	private _players: MsgScenePlayer[] = [];


	constructor(packet?: Packet) {
		if (packet) {
			this._players = [];
			let players_count: number = packet.ReadUshort();
			for (var i: number = 0; i < players_count; i++)
			{
				this._players.push(new MsgScenePlayer(packet));
			}
		}
	}


	public get players(): MsgScenePlayer[] {return this._players; }
	public set players(value: MsgScenePlayer[]) { this._players = value; }
}
