
interface Handler {
    caller: any;
    method: Function;
}

interface QueueData {
    key: number;
    value: any;
}


class EventMgr {
    private _handlers: { [eventId: number]: Handler[] } = {};
    private _eventQueue: QueueData[] = [];

    private static _inst: EventMgr = null;
    public static get inst(): EventMgr { return this._inst || (this._inst = new EventMgr()); }


    public on(eventId: number, caller: any, method: Function): void {
        if (this._handlers[eventId]) {
            const handlers = this._handlers[eventId];
            const handler: Handler = { caller: caller, method: method };
            handlers.push(handler);
        } else {
            const handlers: Handler[] = [];
            const handler: Handler = { caller: caller, method: method };
            handlers.push(handler);
            this._handlers[eventId] = handlers;
        }
    }

    public off(eventId: number, caller: any, method: Function): void {
        if (this._handlers[eventId]) {
            const handlers: Handler[] = this._handlers[eventId];
            for (let i = handlers.length - 1; i >= 0; i--) {
                let handler: Handler = handlers[i];
                if (handler.caller == caller && handler.method == method) {
                    handlers.splice(i, 1);
                }
            }
        } else {
            console.log('eventId: ' + eventId + ' 没有注册');
        }
    }

    public clear(caller: any): void {
        for (let eventId in this._handlers) {
            const handlers: Handler[] = this._handlers[eventId];
            for (let i = handlers.length - 1; i >= 0; i--) {
                let handler: Handler = handlers[i];
                if (handler.caller == caller) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        }
    }

    public fire(eventId: number = 0, data?: any): void {
        let queueData: QueueData = { key: eventId, value: data };
        this._eventQueue.push(queueData);
    }


    public update(dt: number): void {
        for (let i = 0; i < this._eventQueue.length; i++) {
            const kvPair: QueueData = this._eventQueue[i];
            const key: number = kvPair.key;
            const value: any = kvPair.value;

            if (this._handlers[key]) {
                const handlers = this._handlers[key];
                for (let j = 0; j < handlers.length; j++) {
                    const handler: Handler = handlers[j];
                    handler.method.apply(handler.caller, [key, value]);
                }
            }
        }
        this._eventQueue = [];
    }
}
(<any>window).EventMgr = EventMgr
