interface Handler {
    method: Function;
    caller: any;
}


export default class EventMgr {
    private _handlers: { [eventId: number]: Handler[] } = {};

    private static _inst: EventMgr = null;
    public static get inst(): EventMgr { return this._inst || (this._inst = new EventMgr()); }


    // 事件回调注册
    public on(eventId: number, method: Function, caller?: any): void {
        if (this._handlers[eventId]) {
            const handlers = this._handlers[eventId];
            const handler: Handler = { method: method, caller: caller };
            handlers.push(handler);
        } else {
            const handlers: Handler[] = [];
            const handler: Handler = { method: method, caller: caller };
            handlers.push(handler);
            this._handlers[eventId] = handlers;
        }
    }

    // 事件回调删除
    public off(eventId: number, method: Function, caller: any): void {
        if (!this._handlers[eventId]) {
            console.error('off eventId:' + eventId + ' 没有注册');
            return;
        }

        const handlers: Handler[] = this._handlers[eventId];
        for (let i = handlers.length - 1; i >= 0; i--) {
            let handler: Handler = handlers[i];
            if (handler.method == method && handler.caller == caller) {
                handlers.splice(i, 1);
            }
        }
    }

    // 事件回调清除 caller 为空清除所有, 不为空清除对应 caller 回调
    public clear(caller?: any): void {
        if (!caller) {
            this._handlers = {};
            return;
        }

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

    // 事件触发
    public fire(eventId: number, data?: any): void {
        if (!this._handlers[eventId]) {
            console.error('fire eventId:' + eventId + ' 没有注册');
            return;
        }

        const handlers = this._handlers[eventId];
        for (let j = 0; j < handlers.length; j++) {
            const handler: Handler = handlers[j];
            handler.method.apply(handler.caller, [eventId, data]);
        }
    }
}
