namespace core.manager {
	export class EventMgr {
		private _handlers: { [eventId: number]: HandlerFunc[] } = {};
		private _eventQueue: QueueData[] = [];


		private static _inst: EventMgr = null;
		public static get Inst(): EventMgr {
			return this._inst || (this._inst = new EventMgr());
		}
		private constructor() {
			Laya.timer.frameLoop(1, this, this.update);
		}


		public on(eventId: number, handler: HandlerFunc): void {
			if (this._handlers[eventId]) {
				const handlers = this._handlers[eventId];
				handlers.push(handler);
			} else {
				const handlers: HandlerFunc[] = [];
				handlers.push(handler);
				this._handlers[eventId] = handlers;
			}
		}

		public off(eventId: number, handler: HandlerFunc): void {
			if (this._handlers[eventId]) {
				const handlers = this._handlers[eventId];
				let delIdx = -1;
				for (let i = 0; i < handlers.length; i++) {
					if (handlers[i] == handler) {
						delIdx = i;
						break;
					}
				}
				if (delIdx != -1) handlers.splice(delIdx, 1);
			} else {
				console.log('eventId: ' + eventId + ' 没有注册');
			}
		}

		public fire(eventId: number = 0, data?: any): void {
			let queueData: QueueData = { key: eventId, value: data };
			this._eventQueue.push(queueData);
		}


		private update(): void {
			for (let i = 0; i < this._eventQueue.length; i++) {
				const kvPair: QueueData = this._eventQueue[i];
				const key: number = kvPair.key;
				const value: any = kvPair.value;

				if (this._handlers[key]) {
					const callbacks = this._handlers[key];
					for (let j = 0; j < callbacks.length; j++) {
						callbacks[j](key, value);
					}
				}
			}
			this._eventQueue = [];
		}
	}
}


interface HandlerFunc {
	(number, any): void;
}

interface QueueData {
	key: number;
	value: any;
}
