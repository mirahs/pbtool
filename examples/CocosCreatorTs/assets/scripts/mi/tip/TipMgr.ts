import { LayerMgr } from '@mi/view/LayerMgr'


export class TipMgr {
    private static _tipPrefab: cc.Prefab = null;


    public static init(): void {
        cc.loader.loadRes('mi/core/Tip', (err: Error, tipPrefab: cc.Prefab) => {
            if (!err) {
                this._tipPrefab = tipPrefab
            }
            else {
                cc.log('找不到Tip面板皮肤 mi/core/Tip err:' + err)
            }
        });
    }


    public static addTip(content: string) {
        var panelTip = cc.instantiate(this._tipPrefab)
        LayerMgr.setLayer(panelTip, AppConst.viewLayer.Tips)

        var tipView = panelTip.getComponent('TipView')
        tipView.startTip(content)
    }
}
