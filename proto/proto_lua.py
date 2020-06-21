#!/usr/bin/env python
# coding:utf-8
from sys import path
path.append(r'../')

from utils import tool


lan_types = {
	'u8':       'U8',
	'i8':       'I8',
	'u16':      'U16',
	'i16':      'I16',
	'u32':      'U32',
	'i32':      'I32',
	'u64':      'U64',
	'i64':      'I64',
	'string':   'String',
	'f32':      'F32',
	'f64':      'F64',
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


def protocol_msg(code_path, mess_name_ids):
	file_name		= code_path + 'Msg.lua'
	file_protocols	= code_path + 'Protocols.lua'

	_str_msg_head	= 'module("Msg", package.seeall)\n\n\n'
	_str_msg		= ''
	_str_protocols_require = ''
	_str_protocols	= ''
	for mess_name_id in mess_name_ids:
		mess_name 	= mess_name_id['mess_name']
		mess_id 	= mess_name_id['mess_id']
		mess_note	= mess_name_id['mess_note']
		_str_msg += '-- [' + str(mess_id) + ']' + mess_note + '\n' + tool.lua_proto_name_msg(mess_name).ljust(35, chr(32)) + ' = ' + str(mess_id) + '\n\n'
		_str_protocols += 'require "' + tool.lua_class_name(mess_name) + '"\n'

	_str_msg = _str_msg_head + _str_msg[:-1]
	with open(file_name, 'w+') as fd:
		fd.write(_str_msg)

	with open(file_protocols, 'w+') as fd:
		fd.write(_str_protocols)


def get_check_option(field_name, field_type):
	if field_type.startswith('Msg'):
		return field_name + ' ~= nil'
	elif field_type == 'string':
		return field_name + ' ~= ""'
	else:
		return field_name + ' ~= 0'


class ProtoLua(object):
	def __init__(self, code_path, proto):
		proto_tmp				= trans_mess_type(proto)

		self._proto 			= proto_tmp

		self._code_path			= code_path
		self._mess_name 		= self._proto['mess_name']

		self._set_class_name()
		self._set_head()
		self._set_new()
		self._set_init()
		self._set_encode()
		self._set_decode()
		self._set_get_bytes()

	def _set_class_name(self):
		self._str_msg_name 	= tool.lua_proto_name_msg(self._mess_name)
		self._str_class_name= tool.lua_class_name(self._mess_name)

	def _set_head(self):
		self._str_head = 'module("' + self._str_class_name + '", package.seeall)\n'

	def _set_new(self):
		self._str_new = 'function new()\n\tlocal tab_obj = {}\n\tsetmetatable(tab_obj, {__index = ' + self._str_class_name + '})\n\ttab_obj:init()\n\treturn tab_obj\nend\n'

	def _set_init(self):
		self._str_init = 'function init(self)\n'
		for mess_field in self._proto['mess_fields']:
			field_op 	= mess_field['field_op']
			field_type 	= mess_field['field_type']
			field_name 	= mess_field['field_name']
			if 'required' == field_op:
				if field_type.startswith('Msg'):
					self._str_init += '\tself.' + field_name + ' = nil\n'
				elif field_type == 'string':
					self._str_init += '\tself.' + field_name + ' = ""\n'
				else:
					self._str_init += '\tself.' + field_name + ' = 0\n'
			elif 'repeated' == field_op:
				self._str_init += '\tself.' + field_name + ' = {}\n'
			elif 'optional' == field_op:
				if field_type.startswith('Msg'):
					self._str_init += '\tself.' + field_name + ' = nil\n'
				elif field_type == 'string':
					self._str_init += '\tself.' + field_name + ' = ""\n'
				else:
					self._str_init += '\tself.' + field_name + ' = 0\n'
		self._str_init += 'end\n'

	def _set_encode(self):
		self._str_encode = 'function encode(self)\n\tlocal pack = packet.new()\n'
		for mess_field in self._proto['mess_fields']:
			field_op 	= mess_field['field_op']
			field_type 	= mess_field['field_type']
			field_name 	= mess_field['field_name']
			if 'required' == field_op:
				if field_type.startswith('Msg'):
					self._str_encode += '\t' + 'pack:writeBytes(self.' + field_name + ':getBytes())\n'
				else:
					self._str_encode += '\t' + 'pack:write' + field_type + '(self.' + field_name + ')\n'
			elif 'repeated' == field_op:
				field_name_count = field_name + '_count'
				self._str_encode += '\tlocal ' + field_name_count + ' = table.getn(self.' + field_name + ')\n'
				self._str_encode += '\t' + 'pack:writeU16(' + field_name_count + ')\n'
				self._str_encode += '\tfor i = 1, ' + field_name_count + ' do\n'
				if field_type.startswith('Msg'):
					self._str_encode += '\t\t' + 'pack:writeBytes(table.remove(self.' + field_name + '):getBytes())\n'
				else:
					self._str_encode += '\t\t' + 'pack:write' + field_type + '(table.remove(self.' + field_name + '))\n'
				self._str_encode += '\tend\n'
			elif 'optional' == field_op:
				self._str_encode += '\tif self.' + get_check_option(field_name, field_type) + ' then\n'
				self._str_encode += '\t\t' + 'pack:writeU8(1)\n'
				if field_type.startswith('Msg'):
					self._str_encode += '\t\t' + 'pack:writeBytes(self.' + field_name + ':getBytes())\n'
				else:
					self._str_encode += '\t\t' + 'pack:write' + field_type + '(self.' + field_name + ')\n'
				self._str_encode += '\telse\n\t\t' + 'pack:writeU8(0)\n'
				self._str_encode += '\tend\n'

		if self._mess_name.startswith('Msg'):
			self._str_encode += '\treturn pack:readBytes()\n'
		else:
			self._str_encode += '\treturn pack:encode(Msg.' + self._str_msg_name + ')\n'
		self._str_encode += 'end\n'

	def _set_decode(self):
		self._str_decode = 'function decode(self, pack)\n'
		for mess_field in self._proto['mess_fields']:
			field_op 	= mess_field['field_op']
			field_type 	= mess_field['field_type']
			field_name 	= mess_field['field_name']
			if 'required' == field_op:
				if field_type.startswith('Msg'):
					self._str_decode += '\tself.' + field_name + ' = ' + field_type + '.new():decode(pack)\n'
				else:
					self._str_decode += '\tself.' + field_name + ' = pack:read' + field_type + '()\n'
			elif 'repeated' == field_op:
				field_name_count = field_name + '_count'
				self._str_decode += '\tlocal ' + field_name_count + ' = pack:readU16()\n'
				self._str_decode += '\tfor i = 1, ' + field_name_count + ' do\n'
				if field_type.startswith('Msg'):
					self._str_decode += '\t\ttable.insert(self.' + field_name + ', ' + field_type + '.new():decode(pack))\n'
				else:
					self._str_decode += '\t\ttable.insert(self.' + field_name + ', pack:read' + field_type + '())\n'
				self._str_decode += '\tend\n'
			elif 'optional' == field_op:
				field_name_flag = field_name + '_flag'
				self._str_decode += '\t local ' + field_name_flag + ' = pack:readU8()\n'
				self._str_decode += '\tif ' + field_name_flag + ' then\n'
				if field_type.startswith('Msg'):
					self._str_decode += '\t\tself.' + field_name + ' = ' + field_type + '.new():decode(pack)\n'
				else:
					self._str_decode += '\t\tself.' + field_name + ' = pack:read' + field_type + '()\n'
				self._str_decode += '\tend\n'
		self._str_decode += '\treturn self\nend\n'

	def _set_get_bytes(self):
		self._str_get_bytes = 'function getBytes(self)\n\treturn self:encode()\nend\n'

	def _do_msg(self):
		file_name = self._code_path + self._str_class_name + '.lua'

		str_content = self._str_head + '\n\n' + self._str_new + '\n' + self._str_init + '\n\n' + self._str_encode + '\n' + self._str_decode + '\n' + self._str_get_bytes + '\nreturn ' + self._str_class_name + '\n'

		with open(file_name, 'w+') as fd:
			fd.write(str_content)

		with open(file_name, 'w+') as fd:
			fd.write(str_content)

	def do_client(self):
		if self._mess_name.startswith('C'):
			file_name = self._code_path + self._str_class_name + '.lua'

			str_content = self._str_head + '\n\n' + self._str_new + '\n' + self._str_init + '\n\n' + self._str_encode + '\nreturn ' + self._str_class_name + '\n'

			with open(file_name, 'w+') as fd:
				fd.write(str_content)

			with open(file_name, 'w+') as fd:
				fd.write(str_content)
		elif self._mess_name.startswith('S'):
			file_name = self._code_path + self._str_class_name + '.lua'

			str_content = self._str_head + '\n\n' + self._str_new + '\n' + self._str_init + '\n\n' + self._str_decode + '\nreturn ' + self._str_class_name + '\n'

			with open(file_name, 'w+') as fd:
				fd.write(str_content)

			with open(file_name, 'w+') as fd:
				fd.write(str_content)
		else:
			self._do_msg()

	def do_server(self):
		if self._mess_name.startswith('C'):
			file_name = self._code_path + self._str_class_name + '.lua'

			str_content = self._str_head + '\n\n' + self._str_new + '\n' + self._str_init + '\n\n' + self._str_decode

			with open(file_name, 'w+') as fd:
				fd.write(str_content)
		elif self._mess_name.startswith('S'):
			file_name = self._code_path + self._str_class_name + '.lua'

			str_content = self._str_head + '\n\n' + self._str_new + '\n' + self._str_init + '\n\n' + self._str_encode

			with open(file_name, 'w+') as fd:
				fd.write(str_content)

			with open(file_name, 'w+') as fd:
				fd.write(str_content)
		else:
			self._do_msg()
