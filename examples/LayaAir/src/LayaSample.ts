import EventMgr = core.manager.EventMgr;
import NetMgr = core.manager.NetMgr;


class GameMain {
    constructor() {
        Laya.init(600, 400);

        EventMgr.Inst.on(1, this.testEvent);
        EventMgr.Inst.fire(1);
        EventMgr.Inst.fire(1, 10086);
        EventMgr.Inst.fire(1, '10086');
        EventMgr.Inst.fire(1, [111, 222]);
        EventMgr.Inst.fire(1, { a: 111, b: 222 });

        console.log('NetMgr.Inst.isConnect:' + NetMgr.Inst.isConnect);
    }


    private testEvent(eventId: number, data: any): void {
        console.log('testEvent eventId:' + eventId, data);
    }
}


new GameMain();
