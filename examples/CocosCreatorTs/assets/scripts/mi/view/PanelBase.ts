import {ViewBase} from '@mi/view/ViewBase'
import {PanelMgr} from '@mi/view/PanelMgr'


export class PanelBase extends ViewBase {
    public panelName: string = ''
    public panelShowStyle: number = AppConst.panelShowStyle.Normal
    public panelMaskStyle: number = AppConst.panelMaskStyle.NoThrough
    public openDuration: number = 0.2


    // 关闭面板
    public close(): void {
        PanelMgr.hidePanel(this.panelName);
    }

    // 立刻关闭
    public closeImmediate(): void {
        PanelMgr.destroyPanel(this.panelName);
    }
}
