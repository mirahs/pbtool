import { PanelBase } from '@mi/view/PanelBase'
import { TipMgr } from '@mi/tip/TipMgr'


export class PanelGreen extends PanelBase {
    public onInit(): void {
        this.skinPath = 'mi/example/PanelGreen';
        this.cache = true;

        //this.PanelMaskStyle = cy.AppConst.PanelMaskStyle.Through;//可以穿透
        //this.PanelMaskStyle = cy.AppConst.PanelMaskStyle.NoThrough;//不可以穿透
        //this.PanelMaskStyle = cy.AppConst.PanelMaskStyle.Close;//关闭组件
        this.panelMaskStyle = AppConst.panelMaskStyle.Close | AppConst.panelMaskStyle.Black;//关闭组件加半透明
    }

    public onButtonClick(button: cc.Button): void {
        if (button.node.name == 'BtnTip') {
            TipMgr.addTip('这是宝强绿面板的Tip！');
        }
    }
}
