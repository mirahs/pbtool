import mi from '@mi/MI'


export class LayerMgr {
    // 显示节点map
    private static _layers: { [key: number]: cc.Node } = {};
    // 显示层次
    private static _zIndex: number = 0;


    /**
     * 初始化显示节点
     */
    public static init(): void {
        for (const name in AppConst.viewLayer) {
            const value: number = AppConst.viewLayer[name];

            const layer: cc.Node = this.createLayer(name, value);
            mi.uiRoot.addChild(layer);
            this.setWidget(layer);
            this._layers[value] = layer;
        }
    }

    /**
     * 为节点设置父节点
     * @param go 节点
     * @param layer 父节点key
     */
    public static setLayer(go: cc.Node, layer: number): void {
        const parent: cc.Node = this._layers[layer];
        go.parent = parent;
        go.zIndex = this._zIndex;
        this._zIndex++;
    }


    /**
     * 创建显示节点
     * @param name 
     * @param zIndex 
     */
    private static createLayer(name: string, zIndex: number): cc.Node {
        const layer: cc.Node = new cc.Node(name);
        layer.zIndex = zIndex;
        //layer.setContentSize(mi.uiRoot.getContentSize());
        return layer;
    }

    /**
     * 为节点设置对齐挂件
     * @param go 节点
     * @param target 对齐目标(默认父节点)
     */
    private static setWidget(go: cc.Node, target?: cc.Node): void {
        const widget: cc.Widget = go.addComponent(cc.Widget);
        if (target) widget.target = target;
        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.isAlignLeft = true;
        widget.isAlignRight = true;
        widget.top = 0;
        widget.bottom = 0;
        widget.left = 0;
        widget.right = 0;
    }
}
