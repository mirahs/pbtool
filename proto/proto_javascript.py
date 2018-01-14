#!/usr/bin/env python
# coding:utf-8
from sys import path
path.append(r'../')

from utils import tool


lan_types = {
	'u8':       'byte',
	'i8':       'sbyte',
	'u16':      'ushort',
	'i16':      'short',
	'u32':      'uint',
	'i32':      'int',
	'u64':      'ulong',
	'i64':      'long',
	'f32':      'float',
	'f64':      'double',
	'string':   'string',
}


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
	file_name		= code_path + 'Msg.js'

	_str_msg_head	= 'module.exports = Object.freeze({\n'
	_str_msg_end	= ')};\n'
	_str_msg		= ''
	for mess_name_id in mess_name_ids:
		mess_name 	= mess_name_id['mess_name']
		if mess_name.startswith('C') or mess_name.startswith('C'):
			mess_id 	= mess_name_id['mess_id']
			mess_note	= mess_name_id['mess_note']
			_str_msg += '\t//' + mess_note + '\n\t' + (tool.javascript_proto_name_msg(mess_name)).ljust(30, chr(32)) + ': ' + str(mess_id) + ',\n\n'

	_str_msg = _str_msg_head + _str_msg[:-1] + _str_msg_end
	with open(file_name, 'w+') as fd:
		fd.write(_str_msg)


class ProtoJavaScript(object):
	def __init__(self, code_path, proto):
		proto_tmp = trans_mess_type(proto)

		self._proto 			= proto_tmp

		self._code_path			= code_path
		self._mess_name 		= self._proto['mess_name']

		self._set_class_name()
		self._set_filename()
		self._set_head()
		self._set_head_require()
		self._set_end()
		self._set_priv_var()
		self._set_encode()
		self._set_decode()
		self._set_set_get()
		self._set_get_buffer()

	def _set_class_name(self):
		self._str_msg_name 	= tool.javascript_proto_name_msg(self._mess_name)
		self._str_class_name= tool.javascript_class_name(self._mess_name)

	def _set_filename(self):
		self._filename = self._code_path + self._str_class_name + '.js'

	def _set_head(self):
		self._str_head = 'module.exports = ' + self._str_class_name + ';\n\n' + 'var Packet = require(\'../net/Packet\');'

	def _set_head_require(self):
		self._str_head_require = ''
		require_msgs = list()
		for mess_field in self._proto['mess_fields']:
			field_type = mess_field['field_type']
			if field_type.startswith('Msg') and field_type not in require_msgs:
				require_msgs.append(field_type)
				self._str_head_require += 'var ' + field_type + ' = require(\'./' + field_type + '\');\n'

	def _set_end(self):
		self._str_end = '}\n'

	def _set_priv_var(self):
		self._str_priv_var = 'var ' + self._str_class_name + ' = function() {\n'
		for mess_field in self._proto['mess_fields']:
			field_op 		= mess_field['field_op']
			field_type 		= mess_field['field_type']
			field_name 		= mess_field['field_name']
			field_name_flag = '_' + field_name + '_flag'
			field_name_m	= '_' + field_name
			if field_op == 'repeated':
				self._str_priv_var += '\tthis.' + field_name_m + ' = new Array()' + ';\n'
			elif field_op == 'optional':
				self._str_priv_var += '\tthis.' + field_name_flag + ' = 0;\n'
				self._str_priv_var += '\tthis.' + field_name_m + ' = undefined;\n'
			else:
				self._str_priv_var += '\tthis.' + field_name_m + ' = undefined;\n'

	def _set_encode(self):
		self._str_encode = '\tthis.Encode() {\n\t\tvar packet = new Packet();\n'
		for mess_field in self._proto['mess_fields']:
			field_op 		= mess_field['field_op']
			field_type 		= mess_field['field_type']
			field_type_big	= field_type.capitalize()
			field_name 		= mess_field['field_name']
			field_name_flag	= 'this._' + field_name + '_flag'
			field_name_m 	= 'this._' + field_name
			field_name_count= field_name + '_count'
			if field_op == 'repeated':
				self._str_encode += '\t\tvar ' + field_name_count + ' = ' + field_name_m + '.length;\n'
				self._str_encode += '\t\tpacket.WriteUshort(' + field_name_count + ');\n'
				self._str_encode += '\t\tfor (var i = 0; i < ' + field_name_count + '; i++)\n\t\t{\n'
				self._str_encode += '\t\t\tvar xxx = ' + field_name_m + '[i];\n'
				if field_type.startswith('Msg'):
					self._str_encode += '\t\t\tpacket.WriteBuffer(xxx' + '.GetBuffer());\n\t\t}\n'
				else:
					self._str_encode += '\t\t\tpacket.Write' + field_type_big + '(xxx);\n\t\t}\n'
			elif field_op == 'optional':
				self._str_encode += '\t\tpacket.WriteByte(' + field_name_flag + ');\n'
				self._str_encode += '\t\tif (' + field_name_flag + ' == 1)\n\t\t{\n'
				if field_type.startswith('M'):
					self._str_encode += '\t\t\tpacket.WriteBuffer(' + field_name_m + '.GetBuffer());\n\t\t}\n'
				else:
					self._str_encode += '\t\t\tpacket.Write' + field_type_big + '(' + field_name_m + ');\n\t\t}\n'
			else:
				if field_type.startswith('M'):
					self._str_encode += '\t\tpacket.WriteBuffer(' + field_name_m + '.GetBuffer());\n'
				else:
					self._str_encode += '\t\tpacket.Write' + field_type_big + '(' + field_name_m + ');\n'
		if not self._str_class_name.startswith('Msg'):
			self._str_encode += '\t\tpacket.Encode(Msg.' + self._str_msg_name + ');\n'
		self._str_encode += '\t\treturn packet;\n\t}\n'

	def _set_decode(self):
		self._str_decode = '\tthis.Decode(packet) {\n'
		for mess_field in self._proto['mess_fields']:
			field_op 		= mess_field['field_op']
			field_type 		= mess_field['field_type']
			field_type_big 	= field_type.capitalize()
			field_name 		= mess_field['field_name']
			field_name_m 	= 'this._' + field_name
			field_name_flag = field_name + '_flag'
			field_name_count= field_name + '_count'
			if field_op == 'repeated':
				self._str_decode += '\t\tvar ' + field_name_count + ' = packet.ReadUshort();\n'
				self._str_decode += '\t\tfor (var i = 0; i < ' + field_name_count + '; i++)\n\t\t{\n'
				if field_type.startswith('Msg'):
					self._str_decode += '\t\t\t' + field_name_m + '.push(new ' + field_type + '(packet));\n\t\t}\n'
				else:
					self._str_decode += '\t\t\t' + field_name_m + '.push(packet.Read' + field_type.capitalize() + '());\n\t\t}\n'
			elif field_op == 'optional':
				self._str_decode += '\t\tthis._' + field_name_flag + ' = packet.ReadByte();\n'
				self._str_decode += '\t\tif (this._' + field_name_flag + ' == 1)\n'
				self._str_decode += '\t\t{\n'
				if field_type.startswith('M'):
					self._str_decode += '\t\t\t' + field_name_m + ' = new ' + field_type + '(packet);\n'
				else:
					self._str_decode += '\t\t\t' + field_name_m + ' = ' + 'packet.Read' + field_type_big + '();\n'
				self._str_decode += '\t\t}\n'
			else:
				if field_type.startswith('M'):
					self._str_decode += '\t\t' + field_name_m + ' = new ' + field_type + '(packet);\n'
				else:
					self._str_decode += '\t\t' + field_name_m + ' = packet.Read' + field_type_big + '();\n'
		self._str_decode += '\t}\n'

	def _set_set_get(self):
		self._str_set = ''
		self._str_get = ''
		self._str_set_get = ''
		for mess_field in self._proto['mess_fields']:
			field_op 		= mess_field['field_op']
			field_name 		= mess_field['field_name']
			field_name_func	= tool.underline_to_camel(field_name)
			field_name_flag = field_name + '_flag'

			str_set = '\tthis.Set' + field_name_func + '(' + field_name + ') {\n'
			str_get = '\tthis.Get' + field_name_func + '() {\n\t\treturn this._' + field_name + ';\n'

			if field_op == 'optional':
				str_set += '\t\tthis._' + field_name_flag + ' = 1;\n'
			str_set += '\t\tthis._' + field_name + ' = ' + field_name + ';\n'

			str_set += '\t}'
			str_get += '\t}'

			self._str_set += str_set + '\n\n'
			self._str_get += str_get + '\n\n'
			self._str_set_get += str_set + '\n' + str_get + '\n\n'

	def _set_get_buffer(self):
		self._str_get_buffer = '\tthis.GetBuffer() {\n\t\treturn this.Encode().GetBuffer();\n\t}\n'

	def _do_msg(self):
		content = self._str_head + '\n' + self._str_head_require + '\n\n' + self._str_priv_var + '\n\n' + self._str_encode + '\n' + self._str_decode + '\n' + self._str_get_buffer + '\n\n' + self._str_set_get[:-1] + self._str_end

		with open(self._filename, 'w+') as fd:
			fd.write(content)

	def do_client(self):
		if self._mess_name.startswith('C'):
			content = self._str_head + '\n' + self._str_head_require + '\n\n' + self._str_priv_var + '\n\n' + self._str_encode + '\n\n' + self._str_set_get[:-1] + self._str_end

			with open(self._filename, 'w+') as fd:
				fd.write(content)
		elif self._mess_name.startswith('S'):
			content = self._str_head + '\n' + self._str_head_require + '\n\n' + self._str_priv_var + '\n\n' + self._str_decode + '\n\n' + self._str_set_get[:-1] + self._str_end

			with open(self._filename, 'w+') as fd:
				fd.write(content)
		else:
			self._do_msg()

	def do_server(self):
		if self._mess_name.startswith('C'):
			content = self._str_head + '\n\n' + self._str_priv_var + '\n\n' + self._str_decode + '\n\n' + self._str_set_get[:-1] + self._str_end

			with open(self._filename, 'w+') as fd:
				fd.write(content)
		elif self._mess_name.startswith('S'):
			content = self._str_head + '\n\n' + self._str_priv_var + '\n\n' + self._str_encode + '\n\n' + self._str_set_get[:-1] + self._str_end

			with open(self._filename, 'w+') as fd:
				fd.write(content)
		else:
			self._do_msg()
