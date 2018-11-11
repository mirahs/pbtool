import mi from '@mi/MI'


export class ViewBase {
    public skinPath: string = '';
    public skin: cc.Node = null;
    public cache: boolean = false;

    private _args: any[] = [];
    private _buttons: cc.Button[] = [];


    // 初始化
    public init(args: any[]): void {
        this._args = args;
        this.onInit();
    }

    // 重置
    public reset(args: any[]): void {
        this._args = args;
        this.onReset();
    }

    // 初始化完成
    public initDone(): void {
        const buttons: cc.Button[] = this.skin.getComponentsInChildren(cc.Button);
        for (const button of buttons) {
            if (button.node.name.substr(0, 3) == 'Btn') {
                button.node.on(cc.Node.EventType.TOUCH_END, (event) => {
                    this.onButtonClick(button);
                    AudioMgr.playSFX(mi.buttonSound);
                });
                button.interactable = false;
                this._buttons.push(button);
            }
        }
    }

    // 开始显示
    public showing(): void {
        for (const button of this._buttons) {
            button.interactable = true;
        }
        this.onShowing();
    }

    // 显示完成
    public showed(): void {
        this.onShowed();
    }

    // 开始隐藏
    public hiding(): void {
        for (const button of this._buttons) {
            button.interactable = false;
        }
        this.onHiding();
    }

    // 隐藏完成
    public hided(): void {
        this.onHided();
    }

    // 销毁
    public destroy(): boolean {
        cc.error('ViewBase.destroy')
        this.onDestroy();
        this.skin.destroy();
        return true;
    }


    protected onInit(): void {

    }

    protected onReset(): void {

    }

    protected onButtonClick(button: cc.Button): void {

    }

    protected onShowing(): void {

    }

    protected onShowed(): void {

    }

    protected onHiding(): void {

    }

    protected onHided(): void {

    }

    protected onDestroy(): void {

    }
}
