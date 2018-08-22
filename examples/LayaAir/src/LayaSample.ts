import NetMgr = core.manager.NetMgr;


class GameMain {
    private _netMgr: NetMgr = null;


    constructor() {
        Laya.init(600, 400);

        this._netMgr = new NetMgr(() => this.onNetOpen(), () => this.onNetClose(), () => this.onNetError());
        this._netMgr.connect('119.23.52.178', 9090);
    }


    private onNetOpen(): void {
        console.log('网络链接成功');
    }

    private onNetClose(): void {

    }

    private onNetError(): void {
    }
}


new GameMain();
