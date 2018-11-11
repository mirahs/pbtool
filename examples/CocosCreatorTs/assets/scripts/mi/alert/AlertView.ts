const {ccclass, property} = cc._decorator

import mi from '@mi/MI'


@ccclass
export default class TipView extends cc.Component {
    @property(cc.Label)
    private label: cc.Label = null
    @property(cc.Node)
    private btnOk: cc.Node = null
    @property(cc.Node)
    private btnCancel: cc.Node = null

    private _cbOk: Function = null
    private _cbCancel: Function = null

    private _fadeOutFinish: cc.ActionInterval = null


    public onLoad(): void {
        this.node.setContentSize(mi.uiRoot.getContentSize());


        // 初始化透明度和尺寸
        this.node.setScale(2);
        this.node.opacity = 0;

        // 按钮要等动画播放完毕才能点击
        this.btnOk.getComponent(cc.Button).interactable = false;
        this.btnCancel.getComponent(cc.Button).interactable = false;

        // 弹出动画，变成初始状态，即两倍大小，透明
        let actionFadeOut = cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0));
        let self = this;
        // 弹出动画后回调 移除弹出层，对话框其实没有消失，只是变透明了，如果不移除，会屏蔽底层点击事件
        let finished = cc.callFunc(function() {
            self.node.removeFromParent(false);
        }, this);

        // 弹出动画接回调，干掉弹出层
        this._fadeOutFinish = cc.sequence(actionFadeOut, finished);

        // 给按钮注册点击事件
        this.btnOk.on('click', this.onButtonClicked, this);
        this.btnCancel.on('click', this.onButtonClicked, this);
    }


    public show(text, cbOk?: Function, cbCancel?: Function) {
        let self = this;
        // 弹进动画
        let actionFadeIn =cc.spawn(cc.fadeTo(0.3, 255), cc.scaleTo(0.3, 1.0));
        let actionClickOk = cc.callFunc(function() {
            self.btnOk.getComponent(cc.Button).interactable = true;
            self.btnCancel.getComponent(cc.Button).interactable = true;
        });
        let actionSeq = cc.sequence(actionFadeIn, actionClickOk);
        this.node.runAction(actionSeq);

        if (text) {
            this.label.string = text;
        }

        if (cbCancel) {
            // 激活取消按钮
            this.btnCancel.active = true;
            let wg = this.btnOk.getComponent(cc.Widget);
            if(wg){
                // 需要重新设置一遍确定按钮
                wg.left = 50;
                // 确定按钮左对齐
                wg.isAlignLeft = true;
                // 手动刷新widget，立即生效
                wg.updateAlignment();
            }
            if ('function' === typeof(cbCancel)) {
                this._cbCancel = cbCancel;
            }
        }
        else {
            // 干掉取消按钮
            this.btnCancel.active = false;
            // 确定按钮挂载了widget组件，所以直接改x坐标会在下一帧生效
            // 确定按钮居中，需要手动刷新widget
            let wg = this.btnOk.getComponent(cc.Widget);
            if(wg){
                wg.isAlignHorizontalCenter = true;
                // 手动刷新widget，立即生效
                wg.updateAlignment();
            }
        }
        
        // 传一个回调函数进来，用来处理点击确定按钮的逻辑
        if (cbOk) {
            this._cbOk = cbOk;
        }
    }


    onButtonClicked(event) {
        // 确定按钮调用回调函数，取消按钮直接关闭对话框
        if (event.target.name == "alert_ok") {
            if (this._cbOk) {
                this._cbOk();
            }
        }
        else if (event.target.name == "alert_cancel") {
            if (this._cbCancel) {
                this._cbCancel();
            }
        }

        AudioMgr.playSFX(mi.buttonSound);

        this.node.runAction(this._fadeOutFinish);
    }
}
