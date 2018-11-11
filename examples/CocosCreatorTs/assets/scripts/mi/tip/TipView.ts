const {ccclass, property} = cc._decorator

import mi from '@mi/MI'


@ccclass
export default class TipView extends cc.Component {
    @property(cc.Label)
    private lblTip: cc.Label = null

    private _timeAlpha: number = 1
    private _flagAlpha: boolean = false
    private _durationAlpha: number = 1


    public update(dt: number): void {
        if (this._flagAlpha) {
            this._timeAlpha -= dt;
            if (this._timeAlpha <= 0) {
                this.node.destroy();
            }
            var opacityRatio = this._timeAlpha / this._durationAlpha;
            this.node.opacity = opacityRatio * 255;
        }
    }


    public startTip(content: string): void {
        this.lblTip.string = content;
        
        var up = cc.moveBy(1.5, cc.p(0, mi.uiRoot.getContentSize().height / 2 - 100));
        // 升级2.0.0
        // var up = cc.moveBy(1.5, cc.v2(0, cy.UIRoot.getContentSize().height / 2 - 100));
        var upCallback = cc.callFunc(this.upCallback, this);

        this.node.runAction(cc.sequence(up, upCallback));
    }


    private upCallback(): void {
        this._flagAlpha = true;
    }
}
