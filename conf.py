#!/usr/bin/env python
# coding:utf-8
import os


# 数据目录
data_dir    = os.path.join(os.path.dirname(__file__), './data/')
# 原始协议文件目录
data_proto  = data_dir + 'data.proto/'

# action script相关配置
as_package_name     = 'proto'  # 协议文件包名
as_extra_packages   = 'laya.utils.Byte'  # 额外引入的包，多个包空格分隔

# typescript cocos creator相关配置
ts_cc_extra_packages= 'import { Packet } from \'@mi/mod/Packet\''  # 额外引入的包，多个包空格分隔


'''
需要导出协议文件的语言选项
现支持:
    erlang_server
    erlang_client
    erlang_server_old
    erlang_client_old
    csharp_server
    csharp_client
    golang_server
    golang_client
    cpp_server
    cpp_client
    java_server
    java_client
    lua_server
    lua_client
    lua53_server
    lua53_client
    python_server
    python_client
    php_server
    php_client
    javascript_client
    typescript_client
    typescript_cc_client
    actionscript_client

配置格式:
    lang:       需要导出的语言
    code:       协议文件导出目录
    common:		常量和协议记录目录(erlang需要, 其它语言不用配置)
'''
langs_proto = [
    {
        'lang':     'erlang_server',
        'code':     'data.code.erlang.server',
        'common':   'data.code.erlang.common.server',
    },
    {
        'lang':     'erlang_client',
        'code':     'data.code.erlang.client',
        'common':   'data.code.erlang.common.client',
    },
    {
        'lang':     'erlang_server_old',
        'code':     'data.code.erlang.server.old',
        'common':   'data.code.erlang.common.server.old',
    },
    {
        'lang':     'erlang_client_old',
        'code':     'data.code.erlang.client.old',
        'common':   'data.code.erlang.common.client.old',
    },
    {
        'lang':     'csharp_client',
        'code':     'data.code.csharp.client',
    },
    {
        'lang':     'csharp_server',
        'code':     'data.code.csharp.server',
    },
    {
        'lang':     'golang_server',
        'code':     'data.code.golang.server',
    },
    {
        'lang':     'golang_client',
        'code':     'data.code.golang.client',
    },
    {
        'lang':     'cpp_server',
        'code':     'data.code.cpp.server',
    },
    {
        'lang':     'cpp_client',
        'code':     'data.code.cpp.client',
    },
    {
        'lang':     'java_server',
        'code':     'data.code.java.server',
    },
    {
        'lang':     'java_client',
        'code':     'data.code.java.client',
    },
    {
        'lang':     'lua_client',
        'code':     'data.code.lua.client',
        'common':   '',
    },
    {
        'lang':     'lua_server',
        'code':     'data.code.lua.server',
    },
    {
        'lang':     'lua53_client',
        'code':     'data.code.lua53.client',
        'common':   '',
    },
    {
        'lang':     'lua53_server',
        'code':     'data.code.lua53.server',
    },
    {
        'lang':     'xlua_client',
        'code':     'data.code.xlua.client',
        'common':   '',
    },
    {
        'lang':     'python_server',
        'code':     'data.code.python.server',
    },
    {
        'lang':     'python_client',
        'code':     'data.code.python.client',
    },
    {
        'lang':     'php_server',
        'code':     'data.code.php.server',
    },
    {
        'lang':     'php_client',
        'code':     'data.code.php.client',
    },
    {
        'lang':     'javascript_client',
        'code':     'data.code.javascript.client',
    },
    {
        'lang':     'typescript_client',
        'code':     'data.code.typescript.client',
    },
    {
        'lang':     'typescript_cc_client',
        'code':     'data.code.typescript.cc.client',
    },
    {
        'lang':     'actionscript_client',
        'code':     'data.code.actionscript.client',
    },
]
