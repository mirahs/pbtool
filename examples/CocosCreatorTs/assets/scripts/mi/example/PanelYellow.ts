import { PanelBase } from '@mi/view/PanelBase'
import { TipMgr } from '@mi/tip/TipMgr'


export class PanelYellow extends PanelBase {
    public onInit(): void {
        this.skinPath = 'mi/example/PanelYellow';
        this.cache = true;

        this.panelMaskStyle = AppConst.panelMaskStyle.Close;
    }

    public onButtonClick(button: cc.Button): void {
        if (button.node.name == 'BtnTip') {
            TipMgr.addTip('这是黄色面板的Tip！');
        }
    }
}
