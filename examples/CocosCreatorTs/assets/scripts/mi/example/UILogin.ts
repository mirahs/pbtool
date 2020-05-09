import { UIBase } from '@mi/view/UIBase'
import { UIMgr } from '@mi/view/UIMgr'
import { PanelMgr } from '@mi/view/PanelMgr'
import { TipMgr } from '@mi/tip/TipMgr'
import { UIHall } from '@mi/example/UIHall'
import { PanelYellow } from '@mi/example/PanelYellow'
import { PanelGreen } from '@mi/example/PanelGreen'


export class UILogin extends UIBase {
    public onInit(): void {
        this.skinPath = 'mi/example/UILogin'
        this.cache = true
    }

    public onButtonClick(button: cc.Button): void {
        cc.log('button.node.name:' + button.node.name);
        if (button.node.name == 'BtnLogin') {
            UIMgr.open(UIHall)
        }
        else if (button.node.name == 'BtnPanelYellow') {
            PanelMgr.show(PanelYellow)
        }
        else if (button.node.name == 'BtnPanelGreen') {
            PanelMgr.show(PanelGreen)
        }
        else if (button.node.name == 'BtnTips') {
            TipMgr.addTip('这是一个Tip！哈哈')
        }
    }
}
