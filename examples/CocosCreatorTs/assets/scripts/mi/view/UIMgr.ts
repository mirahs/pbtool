import { UIBase } from '@mi/view/UIBase'
import { LayerMgr } from '@mi/view/LayerMgr'


export class UIMgr {
    private static _uis = {};
    private static _current: UIBase = null;
    private static _uiOpens: UIOpen[] = [];


    public static open(uiCls: any, uiCallback: Function = null, ...uiArgs: any[]): void {
        if (this._current && this._current.uiName == uiCls) {
            cc.log('试图切换场景至当前UI:%s', uiCls);
            return;
        }
        this._uiOpens.push(new UIOpen(uiCls, uiArgs));
        this.hideCurrentUI();
        this.show(uiCls, (err) => {
            if (!err) {
                if (uiCallback) uiCallback();
            }
            else {
                cc.log('切换UI失败，uiName:%s err:%s', uiCls, err);
            }
        }, uiArgs);
    }


    private static show(uiCls: any, showCallback: Function, uiArgs: any[]): void {
        if (this._uis[uiCls]) {
            this._current = this._uis[uiCls];
            this._current.reset(uiArgs);
            this._current.skin.active = true;
            LayerMgr.setLayer(this._current.skin, AppConst.viewLayer.UI);
            this._current.showing();
            this._current.showed();
        }
        else {
            this._current = new uiCls();
            this._uis[uiCls] = this._current;
            this._current.uiName = uiCls;
            this._current.init(uiArgs);

            cc.loader.loadRes(this._current.skinPath, (err, uiPerfab) => {
                if (!err) {
                    const skin = cc.instantiate(uiPerfab);
                    this._current.skin = skin;
                    this._current.initDone();

                    LayerMgr.setLayer(this._current.skin, AppConst.viewLayer.UI);
                    this._current.showing();
                    this._current.showed();
                }
                showCallback(err);
            });
        }
    }

    private static hideCurrentUI(): void {
        if (this._current) {
            this._current.hiding();
            this._current.skin.active = false;
            this._current.hided();

            if (!this._current.cache) {
                delete this._uis[this._current.uiName];
                this._current.destroy();
                this._current = null;
            }
        }
    }
}
//(<any>window).UIMgr = UIMgr


class UIOpen {
    constructor(public uiCls: any, public args: any[]) {
    }
}
