import { PanelBase } from '@mi/view/PanelBase'
import { LayerMgr } from '@mi/view/LayerMgr'
import mi from '@mi/MI'


export class PanelMgr {
    private static _panels = {}
    private static _maskPrefab: cc.Prefab = null


    public static init(): void {
        this._maskPrefab = null;
        this._panels = {};

        var self = this;
        cc.loader.loadRes('mi/core/Mask', function (err, maskPrefab) {
            if (!err) {
                self._maskPrefab = maskPrefab;
            }
            else {
                cc.log('找不到遮罩资源 mi/core/Mask err:' + err);
            }
        });
    }


    public static show(panelCls: any, ...panelArgs) {
        if (this._panels[panelCls]) {
            var current = this._panels[panelCls] as PanelBase;
            current.reset(panelArgs);
            current.skin.active = false;
            LayerMgr.setLayer(current.skin, AppConst.viewLayer.Panel);
            current.showing();

            this.startShowPanel(current, current.panelShowStyle, true);
        }
        else {
            var self = this;

            var current = new panelCls() as PanelBase;

            this._panels[panelCls] = current;
            current.panelName = panelCls;
            current.init(panelArgs);

            cc.loader.loadRes(current.skinPath, function (err, panelPrefab) {
                if (!err) {
                    var Skin = cc.instantiate(panelPrefab);

                    current.skin = Skin;
                    current.initDone();

                    current.skin.active = false;

                    LayerMgr.setLayer(current.skin, AppConst.viewLayer.Panel);
                    current.showing();

                    self.maskStyle(current);

                    self.startShowPanel(current, current.panelShowStyle, true);
                }
                else {
                    cc.log('找不到[' + panelCls + ']面板皮肤:' + current.skinPath + ' err:' + err);
                }
            });
        }
    }


    private static startShowPanel(go: PanelBase, showStyle, isOpen) {
        switch (showStyle) {
            case AppConst.panelShowStyle.Normal:
                this.showNormal(go, isOpen);
                break;
        }
    }

    // #region 显示方式
    private static showNormal(go: PanelBase, isOpen) {
        if (isOpen) {
            go.skin.active = true;
            go.showed();
        }
        else {
            this.destroyPanel(go.panelName);
        }
    }
    // #endregion

    // #region 遮罩方式
    private static maskStyle(go: PanelBase) {
        let mask = cc.instantiate(this._maskPrefab);
        mask.zIndex = -1;
        go.skin.addChild(mask);
        mask.setContentSize(mi.uiRoot.getContentSize());

        if ((go.panelMaskStyle & AppConst.panelMaskStyle.NoThrough) > 0) {
            mask.addComponent(cc.BlockInputEvents)
        }
        if ((go.panelMaskStyle & AppConst.panelMaskStyle.Black) > 0) {
            mask.opacity = 125;
        }
        if ((go.panelMaskStyle & AppConst.panelMaskStyle.Close) > 0) {
            go.skin.addComponent(cc.BlockInputEvents);
            mask.addComponent(cc.BlockInputEvents)

            mask.on(cc.Node.EventType.TOUCH_START, function (event) {
                PanelMgr.hidePanel(go.panelName);
            });
        }
    }
    // #endregion

    public static hidePanel(panelName) {
        if (this._panels[panelName]) {
            var pb = this._panels[panelName] as PanelBase;
            this.startShowPanel(pb, pb.panelShowStyle, false);
        } else {
            cc.log("关闭的面板不存在!");
        }
    }

    public static destroyPanel(panelName: string, force: boolean = false) {
        if (this._panels[panelName]) {
            var pb = this._panels[panelName] as PanelBase;
            pb.hiding();
            pb.skin.active = false;
            pb.hided();

            if (force || !pb.cache) {
                delete this._panels[panelName];
                pb.destroy();
                pb = null;
            }
        }
    }
}
