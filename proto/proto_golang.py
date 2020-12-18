#!/usr/bin/env python
# coding:utf-8
from util import util, util_proto

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


def parse(code_path, common_path, protos, _tmp_protos_file):
    name_ids = list()
    for proto in protos:
        name_id = dict()
        name_id['mess_name'] = proto['mess_name']
        name_id['mess_id'] = proto['mess_id']
        name_id['mess_note'] = proto['mess_note']
        name_ids.append(name_id)
        ProtoGolang(code_path, proto).do_parse()

    protocol_const(code_path, name_ids)


# 类型转换
def trans_mess_type(mess_body):
    for idx in xrange(len(mess_body['mess_fields'])):
        mess_field = mess_body['mess_fields'][idx]
        if mess_field['field_op'] == 'required':
            if mess_field['field_type'] in lan_types:
                mess_field['field_type'] = lan_types[mess_field['field_type']]
        if mess_field['field_op'] == 'optional':
            if mess_field['field_type'] in lan_types:
                mess_field['field_type'] = lan_types[mess_field['field_type']]
        if mess_field['field_op'] == 'repeated':
            if mess_field['field_type'] in lan_types:
                mess_field['field_type'] = lan_types[mess_field['field_type']]

        mess_body['mess_fields'][idx] = mess_field

    return mess_body


def protocol_const(code_path, mess_name_ids):
    file_name = code_path + 'protocol_code.go'

    _str_msg_head = 'package proto\n\nconst (\n'
    _str_msg_end = '\n)\n'
    _str_msg = ''
    for mess_name_id in mess_name_ids:
        mess_name = mess_name_id['mess_name']
        mess_id = mess_name_id['mess_id']
        mess_note = mess_name_id['mess_note']

        _str_msg += '\t// ' + mess_note + '\n\t' + util_proto.proto_name_msg(mess_name).ljust(30, chr(32)) + ' uint16 = ' + str(mess_id) + '\n'

    _str_msg = _str_msg_head + _str_msg[:-1] + _str_msg_end
    with open(file_name, 'w+') as fd:
        fd.write(_str_msg)


def get_check_option(field_name, field_type):
    if field_type.startswith('Msg'):
        return field_name + ' != nil'
    elif field_type == 'string':
        return field_name + ' != ""'
    else:
        return field_name + ' != 0'


class ProtoGolang(object):
    def __init__(self, code_path, proto):
        proto_tmp = trans_mess_type(proto)

        self._proto = proto_tmp

        self._code_path = code_path
        self._mess_name = self._proto['mess_name']

        self._set_class_name()
        self._set_packet_id()
        self._set_type_struct()
        self._set_proto_head()
        self._set_proto_encode()
        self._set_proto_decode()

    def _set_class_name(self):
        self._str_class_name = self._mess_name
        self._str_class_name_var = self._str_class_name[:1].lower() + self._str_class_name[1:]

    def _set_packet_id(self):
        self._packet_id = self._proto['mess_id']

    def _set_type_struct(self):
        self._str_type_struct = 'type ' + self._str_class_name + ' struct {\n'
        for mess_field in self._proto['mess_fields']:
            field_op = mess_field['field_op']
            field_type = mess_field['field_type']
            field_name = mess_field['field_name']
            field_name_var = util.underline_to_camel(field_name)
            field_name_mem = field_name_var
            if 'required' == field_op:
                if field_type.startswith('Msg'):
                    self._str_type_struct += '\t' + field_name_mem.ljust(25, chr(32)) + '*' + field_type + '\n'
                else:
                    self._str_type_struct += '\t' + field_name_mem.ljust(25, chr(32)) + field_type + '\n'
            elif 'repeated' == field_op:
                if field_type.startswith('Msg'):
                    self._str_type_struct += '\t' + field_name_mem.ljust(25, chr(32)) + '[]*' + field_type + '\n'
                else:
                    self._str_type_struct += '\t' + field_name_mem.ljust(25, chr(32)) + '[]' + field_type + '\n'
            elif 'optional' == field_op:
                if field_type.startswith('Msg'):
                    self._str_type_struct += '\t' + field_name_mem.ljust(25, chr(32)) + '*' + field_type + '\n'
                else:
                    self._str_type_struct += '\t' + field_name_mem.ljust(25, chr(32)) + field_type + '\n'
        self._str_type_struct += '}\n'

    def _set_proto_head(self):
        self._str_head = 'package proto\n\nimport (\n\t"packet"\n)\n'

    def _set_proto_encode(self):
        self._str_encode = 'func (this *' + self._str_class_name + ') Encode() []byte {\n'
        self._str_encode += '\t' + 'pack := packet.NewWriteBuff(64)\n\n'
        for mess_field in self._proto['mess_fields']:
            field_op = mess_field['field_op']
            field_type = mess_field['field_type']
            field_type_func = field_type[:1].upper() + field_type[1:]
            field_name_var = util.underline_to_camel(mess_field['field_name'])
            field_name_mem = field_name_var
            field_name_count = field_name_mem + 'Count'
            if 'required' == field_op:
                if field_type.startswith('Msg'):
                    self._str_encode += '\t' + 'pack.WriteBytes(this.' + field_name_mem + '.Encode())\n'
                else:
                    self._str_encode += '\t' + 'pack.Write' + field_type_func + '(this.' + field_name_mem + ')\n'
            elif 'repeated' == field_op:
                self._str_encode += '\t' + field_name_count + ' := uint16(len(this.' + field_name_mem + '))\n'
                self._str_encode += '\t' + 'pack.WriteUint16(' + field_name_count + ')\n'
                self._str_encode += '\tfor i := uint16(0); i < ' + field_name_count + '; i++ {\n'
                if field_type.startswith('Msg'):
                    self._str_encode += '\t\t' + 'pack.WriteBytes(this.' + field_name_mem + '[i].Encode())\n'
                else:
                    self._str_encode += '\t\t' + 'pack.Write' + field_type_func + '(this.' + field_name_mem + '[i])\n'
                self._str_encode += '\t}\n'
            elif 'optional' == field_op:
                self._str_encode += '\tif this.' + get_check_option(field_name_var, field_type) + ' {\n'
                self._str_encode += '\t\t' + 'pack.WriteUint8(1)\n'
                if field_type.startswith('Msg'):
                    self._str_encode += '\t\t' + 'pack.WriteBytes(this.' + field_name_mem + '.Encode())\n'
                else:
                    self._str_encode += '\t\t' + 'pack.Write' + field_type_func + '(this.' + field_name_mem + ')\n'
                self._str_encode += '\t} else {\n\t\t' + 'pack.WriteUint8(0)\n'
                self._str_encode += '\t}\n'

        if self._mess_name.startswith('Msg'):
            self._str_encode += '\n\treturn pack.ReadBytes()\n}\n'
        else:
            self._str_encode += '\n\treturn pack.Encode(' + util_proto.proto_name_msg(self._mess_name) + ')\n}\n'

    def _set_proto_decode(self):
        self._str_decode = 'func ' + self._str_class_name + 'Decode(pack *packet.Packet) *' + self._str_class_name + ' {\n'
        self._str_decode += '\t' + self._str_class_name_var + ' := &' + self._str_class_name + '{}\n\n'
        for mess_field in self._proto['mess_fields']:
            field_op = mess_field['field_op']
            field_type = mess_field['field_type']
            field_type_func = field_type[:1].upper() + field_type[1:]
            field_name_var = util.underline_to_camel(mess_field['field_name'])
            field_name_mem = field_name_var[:1].upper() + field_name_var[1:]
            field_name_flag = field_name_mem + 'Flag'
            field_name_count = field_name_mem + 'Count'
            if 'required' == field_op:
                if field_type.startswith('Msg'):
                    self._str_decode += '\t' + self._str_class_name_var + '.' + field_name_mem + ' = ' + field_type + 'Decode(pack)\n'
                else:
                    self._str_decode += '\t' + self._str_class_name_var + '.' + field_name_mem + ' = pack.Read' + field_type_func + '()\n'
            elif 'repeated' == field_op:
                self._str_decode += '\t' + field_name_count + ' := pack.ReadUint16()\n'
                self._str_decode += '\tfor ;' + field_name_count + ' > 0; ' + field_name_count + '-- {\n'
                if field_type.startswith('Msg'):
                    self._str_decode += '\t\t' + self._str_class_name_var + '.' + field_name_mem + ' = append(' + self._str_class_name_var + '.' + field_name_mem + ', ' + field_type + 'Decode(pack))\n'
                else:
                    self._str_decode += '\t\t' + self._str_class_name_var + '.' + field_name_mem + ' = append(' + self._str_class_name_var + '.' + field_name_mem + ', ' + 'pack.Read' + field_type_func + '())\n'
                self._str_decode += '\t}\n'
            elif 'optional' == field_op:
                self._str_decode += '\t' + field_name_flag + ' := pack.ReadUint8()\n'
                self._str_decode += '\tif ' + field_name_flag + ' == 1 {\n'
                if field_type.startswith('Msg'):
                    self._str_decode += '\t\t' + self._str_class_name_var + '.' + field_name_mem + ' = ' + field_type + 'Decode(pack)\n'
                else:
                    self._str_decode += '\t\t' + self._str_class_name_var + '.' + field_name_mem + ' = pack.Read' + field_type_func + '()\n'
                self._str_decode += '\t}\n'
        self._str_decode += '\treturn ' + self._str_class_name_var + '\n}\n'

    def do_parse(self):
        file_name = self._code_path + util.camel_to_underline(self._mess_name) + '.go'

        str_content = self._str_head + '\n' + self._str_type_struct + '\n' + self._str_encode + '\n' + self._str_decode + '\n'

        with open(file_name, 'w+') as fd:
            fd.write(str_content[:-1])
