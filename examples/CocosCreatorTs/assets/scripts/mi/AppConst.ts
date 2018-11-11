class AppConst {
    // View层次
    public static readonly viewLayer = {
        // UI
        UI: 100,
        // 面板
        Panel: 200,
        // Alert
        Alert: 300,
        // 提示
        Tips: 400,
        // 公告
        Notice: 10000,
    };

    // 面板显示方式
    public static readonly panelShowStyle = {
        // 正常出现
        Normal: 1,
        // 中间变大
        CenterSmallToBig: 2,
        // 上往中滑动
        UpToCenter: 3,
        // 下往中滑动
        DownToCenter: 4,
        // 左往中
        LeftToCenter: 5,
        // 右往中
        RightToCenter: 6,
    };

    // 面板遮罩
    public static readonly panelMaskStyle = {
        // 不可穿透
        NoThrough: 0b1,
        // 半透明
        Black: 0b10,
        // 关闭组件
        Close: 0b100,
    };

    // Event事件
    public static readonly event = {
        NetConnectSuccess: 1,   //网络链接成功
        NetConnectFaild: 2,     //网络链接失败
        NetDisconnect: 3,       //网络断开链接
        NetReconnect: 4,        //网络重连
        NetError: 5,            //网络错误
    };
}
(<any>window).AppConst = AppConst
