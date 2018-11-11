const { ccclass } = cc._decorator

import { UIMgr } from '@mi/view/UIMgr'
import { UILogin } from '@mi/example/UILogin'
import mi from '@mi/MI'


@ccclass
export default class NewClass extends cc.Component {
    public onLoad(): void {
        cc.log('App Start!')

        mi.init(this.node)
    }

    public start(): void {
        // 世界从这里开始
        //UIMgr.open(UILogin)
    }

    public update(dt: number): void {
        mi.update(dt)
    }
}
