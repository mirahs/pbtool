import { LayerMgr } from '@mi/view/LayerMgr'


export class Alert {
    private static _alertPrefab: cc.Prefab = null


    public static init(): void {
        cc.loader.loadRes('mi/core/Alert', (err: Error, alertPrefab: cc.Prefab) => {
            if (!err) {
                this._alertPrefab = alertPrefab;
            }
            else {
                cc.log('找不到Alert面板皮肤 mi/core/Alert err:' + err);
            }
        });
    }


    public static show(content, cbOk: Function = null, cbCancel: Function = null) {
        let panelAlert = cc.instantiate(this._alertPrefab);
        LayerMgr.setLayer(panelAlert, AppConst.viewLayer.Alert);

        var alertView = panelAlert.getComponent('AlertView');
        alertView.show(content, cbOk, cbCancel);
    }
}
