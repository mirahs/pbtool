import { PanelMgr } from '@mi/view/PanelMgr'
import { LayerMgr } from '@mi/view/LayerMgr'
import { TipMgr } from '@mi/tip/TipMgr'
import { Alert } from '@mi/alert/Alert'


export default class mi {
    // UI根对象
    public static uiRoot: cc.Node = null
    // 按钮点击音效
    public static buttonSound: string = 'click.mp3'
    // 按钮点击音效(升级2.0.0)
    // public static buttonSound: string = 'click'
    // 浏览器参数
    public static args: { [key: string]: string; } = {}


    /**
     * 初始化框架
     * @param UIRoot UI根对象
     */
    public static init(uiRoot: cc.Node): void {
        this.uiRoot = uiRoot
        this.args = this.urlParse()

        AudioMgr.init()
        LayerMgr.init()
        PanelMgr.init()
        TipMgr.init()
        Alert.init()
    }

    // 每帧执行
    public static update(dt: number): void {
        EventMgr.inst.update(dt)
    }

    // 复制函数
    public static copy(str): void {
        const save = (e) => {
            e.clipboardData.setData('text/plain', str);
            e.preventDefault();
        }
        document.addEventListener('copy', save);
        document.execCommand('copy');
        document.removeEventListener('copy', save);
    }


    // 浏览器参数解析
    private static urlParse(): { [key: string]: string; } {
        var params = {};
        if (window.location == null) {
            return params;
        }
        var name, value;
        var str = window.location.href; //取得整个地址栏
        var num = str.indexOf("?");
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                params[name] = value;
            }
        }
        return params;
    }
}
