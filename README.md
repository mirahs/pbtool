# pbtool

## 类 google protobuf 协议及生成工具
当前为 2.0 版本，如果找不到支持的语言，请使用 [1.0](https://github.com/mirahs/pbtool/tree/1.0) 版本

## Thanks JetBrains
[JetBrains PyCharm](https://www.jetbrains.com/?from=pbtool)

## 依赖
* [python 2.7.x](https://www.python.org/)
* [Git for Windows](https://gitforwindows.org/)(非必要，运行示例程序才需要)

## 支持语言
* [erlang](examples/erlang)
* [golang](examples/golang)
* [typescript_cc](examples/CocosCreatorTs)(适用于 cocos creator)

## 使用方法
修改 conf.py 文件  
data_proto 是协议描述文件目录配置，例：
```python
data_proto  = '/data/proto/'
```
langs_proto 是语言导出配置，配置项 lang 为上面支持的语言，code 为协议文件的导出目录, 例:  
```python
langs_proto = [
    {
        'lang':     'golang',
        'code':     '/data/pbout/golang/',
    },
    {
        'lang':     'typescript_cc',
        'code':     '/data/pbout/typescript.cc/',
    },
]
```
运行协议生成脚本  
```shell
python main.py
```
就会在 langs_proto 配置的每个 code 配置项的目录下面生成协议文件

## 协议描述文件
协议以 message 协议名(协议ID) 开头, 回车后以左大括号 { 加回车, 然后是具体的协议字段, 最后以右大括号 } 加回车结束  

协议字段选项有3种格式: required repeated optional  
* required  必填字段
* repeated  列表字段
* optional  可选字段

具体协议字段 字段选项 字段类型 字段名称: 如 required string uname  
协议类型有: u8 i8 u16 i16 u32 i32 u64 i64 f32 f64 string 自定义  

协议示例:  
```python
message GoodsItem(2010) //物品数据
{
	required	u32			id				//物品ID
	required	u16			num				//物品数量
}

message GoodsList(2020) //物品列表
{
	repeated	GoodsItem	goods			//物品列表
}
```
具体可以看[例子](examples), 里面有 socket 服务端和客户端以及 websocket

## 联系方式
* QQ: 643993254
