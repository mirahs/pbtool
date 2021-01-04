#!/usr/bin/python
# coding:utf-8
from proto_erlang import ProtoErlang, protocol_const


def parse(code_path, common_path, protos, file_protos):
    name_ids = list()
    for proto in protos:
        name_id = dict()
        name_id['mess_name']    = proto['mess_name']
        name_id['mess_id']      = proto['mess_id']
        name_id['mess_note']    = proto['mess_note']
        name_ids.append(name_id)

    protocol_const(common_path, name_ids)

    parse_protos(code_path, file_protos)


def parse_protos(code_path, file_protos):
    _str_unknown_pack = 'pack(_Cmd, _Data) -> \n\t{error, {unknown_command, _Data}}.\n\n\n'
    _str_unknown_unpack = 'unpack(_Cmd, _Bin) -> \n\t{error, {unknown_command, _Bin}}.\n\n'
    for filename in file_protos:
        _file_name = code_path + 'pb_' + filename + '.erl'

        _str_include = ''
        includes = file_protos[filename]['includes']
        if includes:
            for include in includes:
                _str_include += '\n-include("' + include + '.hrl").'
        _str_protos = '-module(pb_' + filename + ').\n\n-include("common.hrl").' + _str_include + '\n\n-compile(export_all).\n\n\n'

        protos = file_protos[filename]['protos']

        for proto in protos:
            _str_proto = ProtoErlang(proto).do_pack()
            if filename == 'struct':
                _str_protos += _str_proto + '.\n\n'
            else:
                _str_protos += _str_proto + ';\n\n'

        if filename != 'struct':
            _str_protos += _str_unknown_pack
        for proto in protos:
            _str_proto = ProtoErlang(proto).do_unpack()
            if filename == 'struct':
                _str_protos += _str_proto + '.\n\n'
            else:
                _str_protos += _str_proto + ';\n\n'

        if filename != 'struct':
            _str_protos += _str_unknown_unpack

        with open(_file_name, 'w+') as fd:
            fd.write(_str_protos[:-1])
