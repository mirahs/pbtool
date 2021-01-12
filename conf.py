#!/usr/bin/env python
# coding:utf-8
import os


# 数据目录
data_dir    = os.path.join(os.path.dirname(__file__), './data/')
# 协议目录
data_proto  = data_dir + 'proto/'


# erlang
erlang_packet_mod = 'pb'    # 编码解码模块

# golang
golang_package_name = 'proto'           # 协议文件包名
golang_import_packages = ['packet']     # 导入包

# typescript cocos creator
typescript_cc_import_packages = 'import Packet from \'../net/Packet\''    # 额外引入的包


'''
需要导出协议文件的语言选项
现支持: erlang,golang,typescript_cc

配置格式:
    lang:       需要导出的语言
    code:       协议文件导出目录
    common:		常量和协议记录目录(erlang需要, 其它语言不用配置)
'''
langs_proto = [
    {
        'lang':     'erlang',
        'code':     data_dir + 'erlang/',
        'common':   data_dir + 'erlang.common/',
    },
    {
        'lang':     'golang',
        'code':     data_dir + 'golang/',
    },
    {
        'lang':     'typescript_cc',
        'code':     data_dir + 'typescript.cc/',
    },
]
