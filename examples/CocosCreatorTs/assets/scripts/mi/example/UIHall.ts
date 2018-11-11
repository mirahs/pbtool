import { UIBase } from '@mi/view/UIBase'
import { UIMgr } from '@mi/view/UIMgr'
import { UILogin } from '@mi/example/UILogin'


export class UIHall extends UIBase {
    public onInit(): void {
        this.skinPath = 'mi/example/UIHall'
        this.cache = true
    }

    public onButtonClick(button: cc.Button): void {
        cc.log('button.node.name: ' + button.node.name);
        if (button.node.name == 'BtnReturn') {
            UIMgr.open(UILogin)
        }
    }
}
