#!/usr/bin/env python
# coding:utf-8
from util import util, util_proto


# 类型映射
lan_types = {
    'u8': 'uint8',
    'i8': 'int8',
    'u16': 'uint16',
    'i16': 'int16',
    'u32': 'uint32',
    'i32': 'int32',
    'u64': 'uint64',
    'i64': 'int64',
    'string': 'string',
    'f32': 'float32',
    'f64': 'float64',
}


# 解析入口
def parse(code_path, common_path, protos, _tmp_protos_file):
    name_ids = list()
    for proto in protos:
        name_id = dict()
        name_id['mess_name'] = proto['mess_name']
        name_id['mess_id']  = proto['mess_id']
        name_id['mess_note'] = proto['mess_note']
        name_ids.append(name_id)

        ProtoGolang(code_path, proto).parse()

    protocol_const(code_path, name_ids)


# 协议常量
def protocol_const(code_path, mess_name_ids):
    file_name = code_path + 'msg.go'

    _str_msg_head = 'package proto\n\nconst (\n'
    _str_msg_end = ')\n'
    _str_msg = ''

    for mess_name_id in mess_name_ids:
        mess_name = mess_name_id['mess_name']
        mess_id = mess_name_id['mess_id']
        mess_note = mess_name_id['mess_note']

        _str_msg += '\t// ' + mess_note + '\n\t' + util_proto.proto_name_msg(mess_name).ljust(30, chr(32)) + ' uint16 = ' + str(mess_id) + '\n'

    _str_msg = _str_msg_head + _str_msg + _str_msg_end
    with open(file_name, 'w+') as fd:
        fd.write(_str_msg)


# 类型转换
def trans_mess_type(proto):
    for idx in xrange(len(proto['mess_fields'])):
        mess_field = proto['mess_fields'][idx]

        if mess_field['field_type'] in lan_types:
            mess_field['field_type'] = lan_types[mess_field['field_type']]

        proto['mess_fields'][idx] = mess_field

    return proto


class ProtoGolang(object):
    def __init__(self, code_path, proto):
        self._reverse_lan_types = dict()

        self._code_path = code_path
        self._proto = trans_mess_type(proto)

        self._mess_name = self._proto['mess_name']

        self._set_class_name()
        self._set_packet_id()

        self._set_head()
        self._set_type_struct()
        self._set_proto_encode()
        self._set_proto_decode()

    def parse(self):
        file_name = self._code_path + util.camel_to_underline(self._mess_name) + '.go'
        str_content = self._str_head + '\n' + self._str_type_struct + '\n' + self._str_encode + '\n' + self._str_decode

        with open(file_name, 'w+') as fd:
            fd.write(str_content)

    def _set_class_name(self):
        self._class_name = self._mess_name
        self._class_name_var = self._class_name[:1].lower() + self._class_name[1:]

    def _set_packet_id(self):
        self._packet_id = self._proto['mess_id']

    def _set_head(self):
        self._str_head = 'package proto\n\nimport (\n\t"packet"\n)\n'

    def _set_type_struct(self):
        self._str_type_struct = 'type ' + self._class_name + ' struct {\n'
        for mess_field in self._proto['mess_fields']:
            field_op = mess_field['field_op']
            field_type = mess_field['field_type']
            field_name = mess_field['field_name']

            field_name_var = util.underline_to_camel(field_name)
            field_name_var_ljust = field_name_var.ljust(25, chr(32))

            if 'repeated' == field_op:
                if self._isCustomType(field_type):
                    self._str_type_struct += '\t' + field_name_var_ljust + '[]*' + field_type + '\n'
                else:
                    self._str_type_struct += '\t' + field_name_var_ljust + '[]' + field_type + '\n'
            else:
                if self._isCustomType(field_type):
                    self._str_type_struct += '\t' + field_name_var_ljust + '*' + field_type + '\n'
                else:
                    self._str_type_struct += '\t' + field_name_var_ljust + field_type + '\n'
        self._str_type_struct += '}\n'

    def _set_proto_encode(self):
        _str_encode_common = self._get_proto_encode_common()

        self._str_encode = 'func (this *' + self._class_name + ') Encode() []byte {\n'
        self._str_encode += _str_encode_common
        self._str_encode += '\n\treturn pack.Encode(uint16(' + self._packet_id + '))\n}\n'

        self._str_encode += '\nfunc (this *' + self._class_name + ') EncodeMsg() []byte {\n'
        self._str_encode += _str_encode_common
        self._str_encode += '\n\treturn pack.ReadBytes()\n}\n'

    def _set_proto_decode(self):
        self._str_decode = 'func ' + self._class_name + 'Decode(pack *packet.Packet) *' + self._class_name + ' {\n'
        self._str_decode += '\t' + self._class_name_var + ' := &' + self._class_name + '{}\n\n'
        for mess_field in self._proto['mess_fields']:
            field_op = mess_field['field_op']
            field_type = mess_field['field_type']
            field_type_func = field_type[:1].upper() + field_type[1:]
            field_name_var = util.underline_to_camel(mess_field['field_name'])
            field_name_mem = field_name_var[:1].upper() + field_name_var[1:]
            field_name_flag = field_name_mem + 'Flag'
            field_name_count = field_name_mem + 'Count'
            if 'required' == field_op:
                if self._isCustomType(field_type):
                    self._str_decode += '\t' + self._class_name_var + '.' + field_name_mem + ' = ' + field_type + 'Decode(pack)\n'
                else:
                    self._str_decode += '\t' + self._class_name_var + '.' + field_name_mem + ' = pack.Read' + field_type_func + '()\n'
            elif 'repeated' == field_op:
                self._str_decode += '\t' + field_name_count + ' := pack.ReadUint16()\n'
                self._str_decode += '\tfor ;' + field_name_count + ' > 0; ' + field_name_count + '-- {\n'
                if self._isCustomType(field_type):
                    self._str_decode += '\t\t' + self._class_name_var + '.' + field_name_mem + ' = append(' + self._class_name_var + '.' + field_name_mem + ', ' + field_type + 'Decode(pack))\n'
                else:
                    self._str_decode += '\t\t' + self._class_name_var + '.' + field_name_mem + ' = append(' + self._class_name_var + '.' + field_name_mem + ', ' + 'pack.Read' + field_type_func + '())\n'
                self._str_decode += '\t}\n'
            elif 'optional' == field_op:
                self._str_decode += '\t' + field_name_flag + ' := pack.ReadUint8()\n'
                self._str_decode += '\tif ' + field_name_flag + ' == 1 {\n'
                if self._isCustomType(field_type):
                    self._str_decode += '\t\t' + self._class_name_var + '.' + field_name_mem + ' = ' + field_type + 'Decode(pack)\n'
                else:
                    self._str_decode += '\t\t' + self._class_name_var + '.' + field_name_mem + ' = pack.Read' + field_type_func + '()\n'
                self._str_decode += '\t}\n'
        self._str_decode += '\treturn ' + self._class_name_var + '\n}\n'

    def _get_proto_encode_common(self):
        _str_encode_common = '\t' + 'pack := packet.NewWriteBuff(64)\n\n'

        for mess_field in self._proto['mess_fields']:
            field_op = mess_field['field_op']
            field_type = mess_field['field_type']
            field_type_func = field_type[:1].upper() + field_type[1:]
            field_name_var = util.underline_to_camel(mess_field['field_name'])
            field_name_mem = field_name_var
            field_name_count = field_name_mem + 'Count'

            if 'required' == field_op:
                if self._isCustomType(field_type):
                    _str_encode_common += '\t' + 'pack.WriteBytes(this.' + field_name_mem + '.EncodeMsg())\n'
                else:
                    _str_encode_common += '\t' + 'pack.Write' + field_type_func + '(this.' + field_name_mem + ')\n'
            elif 'repeated' == field_op:
                _str_encode_common += '\t' + field_name_count + ' := uint16(len(this.' + field_name_mem + '))\n'
                _str_encode_common += '\t' + 'pack.WriteUint16(' + field_name_count + ')\n'
                _str_encode_common += '\tfor i := uint16(0); i < ' + field_name_count + '; i++ {\n'
                if self._isCustomType(field_type):
                    _str_encode_common += '\t\t' + 'pack.WriteBytes(this.' + field_name_mem + '[i].EncodeMsg())\n'
                else:
                    _str_encode_common += '\t\t' + 'pack.Write' + field_type_func + '(this.' + field_name_mem + '[i])\n'
                _str_encode_common += '\t}\n'
            elif 'optional' == field_op:
                _str_encode_common += '\tif this.' + self._get_check_option(field_name_var, field_type) + ' {\n'
                _str_encode_common += '\t\t' + 'pack.WriteUint8(1)\n'
                if self._isCustomType(field_type):
                    _str_encode_common += '\t\t' + 'pack.WriteBytes(this.' + field_name_mem + '.EncodeMsg())\n'
                else:
                    _str_encode_common += '\t\t' + 'pack.Write' + field_type_func + '(this.' + field_name_mem + ')\n'
                _str_encode_common += '\t} else {\n\t\t' + 'pack.WriteUint8(0)\n'
                _str_encode_common += '\t}\n'

        return _str_encode_common

    # 可选类型判断语句
    def _get_check_option(self, field_name, field_type):
        self._reverse_types()
        if not self._reverse_lan_types.get(field_type):
            return field_name + ' != nil'
        else:
            if field_type == 'string':
                return field_name + ' != ""'
            else:
                return field_name + ' != 0'

    def _isCustomType(self, field_type):
        self._reverse_types()
        return not self._reverse_lan_types.get(field_type)

    def _reverse_types(self):
        if len(self._reverse_lan_types) <= 0:
            for key, value in lan_types.items():
                self._reverse_lan_types[value] = key
