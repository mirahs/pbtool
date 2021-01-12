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
每条协议都以 message 协议名(协议ID) 开头, 然后回车后以左大括号 { 加回车, 然后是具体的协议字段, 最后以右大括号 } 加回车结束  
协议名以 C 开头代表客户端请求, S 开头代表服务端返回, Msg开头代表协议块  
协议字段选项有3种格式: required repeated optional  
* required		必填字段, 没填写为类型默认值
* repeated		列表字段, 两个字节代表长度, 后面为列表数据
* optional		可选字段, 一个字节标志, 1表示有数据, 后为具体数据, 0表示无数据  

具体协议字段 字段选项 字段类型 字段名称: 如 required string uname  
协议类型有: u8 i8 u16 i16 u32 i32 u64 i64 f32 f64 string Msg自定义  

具体协议:  
```python
message CTestXX(50000)
{
	required	u16 		id16
	repeated	u8 			idu8s
	optional 	MsgTestXX	msgxx
}

message STestXX(50000)
{
	required	u16 		id16
	repeated	u8 			idu8s
	optional 	MsgTestXX	msgxx
}

message MsgTestXX(50000)
{
	required	string		uname
}
```
具体还是看支持语言的具体例子吧, 每个都写了socket服务端和客户端, 粘包也做了处理
