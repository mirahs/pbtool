#!/usr/bin/env python
# coding:utf-8
import os


DEBUG				= True

data_dir            = os.path.join(os.path.dirname(__file__), '../')
if DEBUG:
	data_dir        = os.path.join(os.path.dirname(__file__), './data/')

data_proto			= data_dir + 'data.proto/'
data_exl			= data_dir + 'data.exl/'

data_xml			= data_dir + 'data.xml/'


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
]

'''
需要导出excel文件的语言选项
现支持导出成xml数据
现支持语言数据:
    erlang
    csharp(常量跟错误常量)
'''
langs_xml = [
    {
        'lang':     'erlang',
        'data':     'data.erl',
        'common':   'data.code.erlang.common.server'
    },
    {
        'lang':     'csharp',
        'data':     '',
        'common':   'data.code.csharp.common'
    }
]
