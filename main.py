#!/usr/bin/env python
# coding:utf-8
import conf
import os
import copy

from proto import proto


protos_all = []
protos_file = {}

_data_proto = conf.data_proto if conf.data_proto.endswith('/') else conf.data_proto + '/'
for dirpath, dirnames, filenames in os.walk(_data_proto):
    for filetmp in filenames:
        filename = dirpath + filetmp
        if os.path.isfile(filename):
            if os.path.splitext(filename)[1] == '.proto':
                file_proto = proto.parse(filename)
                protos_all.extend(file_proto['protos'])
                protos_file[filetmp.split('.')[0]] = file_proto

for lang in conf.langs_proto:
    _lang = lang['lang']
    _code_path = lang['code'] if lang['code'].endswith('/') else lang['code'] + '/'
    if not os.path.exists(_code_path):
        print _code_path + ' 目录不存在'
        continue

    _common_path = ''
    if 'common' in lang:
        _common_path = lang['common'] if lang['common'].endswith('/') else lang['common'] + '/'
        if not os.path.exists(_common_path):
            print _common_path + ' 目录不存在'
            continue

    _tmp_protos_all = copy.deepcopy(protos_all)
    _tmp_protos_file= copy.deepcopy(protos_file)

    lang_module     = 'proto_' + _lang
    exec('from proto import %s' % lang_module)
    exec(lang_module + '.parse(_code_path, _common_path, _tmp_protos_all, _tmp_protos_file)')
