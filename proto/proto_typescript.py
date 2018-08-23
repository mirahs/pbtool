#!/usr/bin/env python
# coding:utf-8
from sys import path
path.append(r'../')

from utils import tool


lan_types = {
	'u8':       ('byte', 'number'),
	'i8':       ('sbyte', 'number'),
	'u16':      ('ushort', 'number'),
	'i16':      ('short', 'number'),
	'u32':      ('uint', 'number'),
	'i32':      ('int', 'number'),
	'u64':      ('ulong', 'Long'),
	'i64':      ('long', 'Long'),
	'f32':      ('float', 'number'),
	'f64':      ('double', 'number'),
	'string':   ('string', 'string'),
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
	file_name = code_path + 'Msg.ts'

	_str_msg_head = 'namespace proto {\n\texport const enum Msg {\n'
	_str_msg_end = '\t}\n}\n'
	_str_msg = ''
	for mess_name_id in mess_name_ids:
		mess_name = mess_name_id['mess_name']
		if mess_name.startswith('S'):
			mess_id = mess_name_id['mess_id']
			mess_note = mess_name_id['mess_note']
			_str_msg += '\t\t/**' + mess_note + '*/\n\t\t' + (tool.javascript_proto_name_msg(mess_name)).ljust(30, chr(32)) + '= ' + str(mess_id) + ',\n\n'

	_str_msg = _str_msg_head + _str_msg[:-1] + _str_msg_end
	with open(file_name, 'w+') as fd:
		fd.write(_str_msg)


class ProtoTypeScript(object):
	def __init__(self, code_path, proto):
		proto_tmp = trans_mess_type(proto)

		self._proto 			= proto_tmp

		self._code_path			= code_path
		self._mess_name 		= self._proto['mess_name']

		self._set_class_name()
		self._set_packet_id()
		self._set_filename()
		self._set_head()
		self._set_end()
		self._set_priv_var()
		self._set_encode()
		self._set_decode()
		self._set_set_get()
		self._set_get_buffer()

	def _set_class_name(self):
		self._str_msg_name 	= tool.python_proto_name_msg(self._mess_name)
		self._str_class_name= tool.python_class_name(self._mess_name)

	def _set_packet_id(self):
		self._packet_id = self._proto['mess_id']

	def _set_filename(self):
		self._filename = self._code_path + self._str_class_name + '.ts'

	def _set_head(self):
		self._str_head = 'namespace proto {'

	def _set_end(self):
		self._str_end = '\n}\n}\n'

	def _set_priv_var(self):
		self._str_priv_var = 'export class ' + self._str_class_name + '\n{\n'
		for mess_field in self._proto['mess_fields']:
			field_op 		= mess_field['field_op']
			field_type 		= mess_field['field_type']
			if not isinstance(field_type, basestring):
				field_type_fun = field_type[0].capitalize()
				field_type = field_type[1]
			field_type_big = field_type.capitalize()
			field_name 		= mess_field['field_name']
			field_name_flag = field_name + '_flag'
			field_name_m	= '_' + field_name
			if field_op == 'repeated':
				self._str_priv_var += '\tprivate ' + field_name_m + ': ' + field_type + '[] = [];\n'
			elif field_op == 'optional':
				self._str_priv_var += '\tprivate ' + field_name_flag + ': number = 0;\n'
				self._str_priv_var += '\tprivate ' + field_name_m + ': ' + field_type + ';\n'
			else:
				self._str_priv_var += '\tprivate ' + field_name_m + ': ' + field_type + ';\n'

	def _set_encode(self):
		self._str_encode = '\tpublic Encode(): game.util.Packet {\n\t\tlet packet: game.util.Packet = new game.util.Packet();\n'
		for mess_field in self._proto['mess_fields']:
			field_op 		= mess_field['field_op']
			field_type 		= mess_field['field_type']
			if not isinstance(field_type, basestring):
				field_type_fun = field_type[0].capitalize()
				field_type = field_type[1]
			field_type_big = field_type.capitalize()
			field_name 		= mess_field['field_name']
			field_name_flag	= field_name + '_flag'
			field_name_m 	= 'this._' + field_name
			field_name_count= field_name + '_count'
			if field_op == 'repeated':
				self._str_encode += '\t\tlet ' + field_name_count + ': number = ' + field_name_m + '.length;\n'
				self._str_encode += '\t\tpacket.WriteUshort(' + field_name_count + ');\n'
				self._str_encode += '\t\tfor (var i: number = 0; i < ' + field_name_count + '; i++)\n\t\t{\n'
				self._str_encode += '\t\t\tlet xxx: ' + field_type + ' = ' + field_name_m + '[i];\n'
				if field_type.startswith('Msg'):
					self._str_encode += '\t\t\tpacket.WriteBuffer(xxx' + '.GetBuffer());\n\t\t}\n'
				else:
					self._str_encode += '\t\t\tpacket.Write' + field_type_fun + '(xxx);\n\t\t}\n'
			elif field_op == 'optional':
				self._str_encode += '\t\tpacket.WriteByte(this.' + field_name_flag + ');\n'
				self._str_encode += '\t\tif (this.' + field_name_flag + ' == 1)\n\t\t{\n'
				if field_type.startswith('M'):
					self._str_encode += '\t\t\tpacket.WriteBuffer(' + field_name_m + '.GetBuffer());\n\t\t}\n'
				else:
					self._str_encode += '\t\t\tpacket.Write' + field_type_fun + '(' + field_name_m + ');\n\t\t}\n'
			else:
				if field_type.startswith('M'):
					self._str_encode += '\t\tpacket.WriteBuffer(' + field_name_m + '.GetBuffer());\n'
				else:
					self._str_encode += '\t\tpacket.Write' + field_type_fun + '(' + field_name_m + ');\n'
		if not self._str_class_name.startswith('Msg'):
			self._str_encode += '\t\tpacket.Encode(' + self._packet_id + ');\n'
		self._str_encode += '\t\treturn packet;\n\t}\n'

	def _set_decode(self):
		self._str_decode = '\tconstructor(packet?: game.util.Packet) {\n'
		self._str_decode += '\t\tif (packet) {\n'
		for mess_field in self._proto['mess_fields']:
			field_op 		= mess_field['field_op']
			field_type 		= mess_field['field_type']
			if not isinstance(field_type, basestring):
				field_type_fun = field_type[0].capitalize()
				field_type = field_type[1]
			field_type_big = field_type.capitalize()
			field_name 		= mess_field['field_name']
			field_name_m 	= 'this._' + field_name
			field_name_flag = field_name + '_flag'
			field_name_count= field_name + '_count'
			if field_op == 'repeated':
				self._str_decode += '\t\t\t' + field_name_m + ' = [];\n'
				self._str_decode += '\t\t\tlet ' + field_name_count + ': number = packet.ReadUshort();\n'
				self._str_decode += '\t\t\tfor (var i: number = 0; i < ' + field_name_count + '; i++)\n\t\t{\n'
				if field_type.startswith('Msg'):
					self._str_decode += '\t\t\t\t' + field_name_m + '.push(new ' + field_type + '(packet));\n\t\t}\n'
				else:
					self._str_decode += '\t\t\t\t' + field_name_m + '.push(packet.Read' + field_type_fun + '());\n\t\t}\n'
			elif field_op == 'optional':
				self._str_decode += '\t\t\tthis. ' + field_name_flag + ' = packet.ReadByte();\n'
				self._str_decode += '\t\t\tif (this.' + field_name_flag + ' == 1)\n'
				self._str_decode += '\t\t\t{\n'
				if field_type.startswith('M'):
					self._str_decode += '\t\t\t\t' + field_name_m + ' = new ' + field_type + '(packet);\n'
				else:
					self._str_decode += '\t\t\t\t' + field_name_m + ' = ' + 'packet.Read' + field_type_fun + '();\n'
				self._str_decode += '\t\t\t}\n'
			else:
				if field_type.startswith('M'):
					self._str_decode += '\t\t\t' + field_name_m + ' = new ' + field_type + '(packet);\n'
				else:
					self._str_decode += '\t\t\t' + field_name_m + ' = packet.Read' + field_type_fun + '();\n'
		self._str_decode += '\t\t}\n'
		self._str_decode += '\t}\n'

	def _set_set_get(self):
		self._str_set_get	= ''
		for mess_field in self._proto['mess_fields']:
			field_op 		= mess_field['field_op']
			field_type 		= mess_field['field_type']
			if not isinstance(field_type, basestring):
				field_type_fun = field_type[0].capitalize()
				field_type = field_type[1]
			field_type_big = field_type.capitalize()
			field_name 		= mess_field['field_name']
			field_name_flag = field_name + '_flag'
			field_name_m 	= 'this._' + field_name
			if field_op == 'repeated':
				self._str_set_get += '\tpublic get ' + field_name + '(): ' + field_type + '[] {return ' + field_name_m + '; }\n'
				self._str_set_get += '\tpublic set ' + field_name + '(value: ' + field_type + '[])' + ' { ' + field_name_m + ' = value; }\n'
			elif field_op == 'optional':
				self._str_set_get += '\tpublic get ' + field_name + '(): ' + field_type + ' { return ' + field_name_m + '; }\n'
				self._str_set_get += '\tpublic set ' + field_name + '(value: ' + field_type + ')' + ' { this.' + field_name_flag + ' = 1; ' + field_name_m + ' = value; }\n'
			else:
				self._str_set_get += '\tpublic get ' + field_name + '(): ' + field_type + ' { return ' + field_name_m + '; }\n'
				self._str_set_get += '\tpublic set ' + field_name + '(value: ' + field_type + ')' + ' { ' + field_name_m + ' = value; }\n'

	def _set_get_buffer(self):
		self._str_get_buffer = '\tpublic GetBuffer(): ByteBuffer\n\t{\n\t\treturn this.Encode().GetBuffer();\n\t}\n'

	def _do_msg(self):
		_tmp_conn = ''
		content = self._str_head + '\n' + self._str_priv_var + '\n\n' + self._str_encode + '\n' + _tmp_conn + '\n' + self._str_decode + '\n' + self._str_get_buffer + '\n\n' + self._str_set_get[:-1] + self._str_end

		with open(self._filename, 'w+') as fd:
			fd.write(content)

	def do_client(self):
		if self._mess_name.startswith('C'):
			content = self._str_head + '\n' + self._str_priv_var + '\n\n' + self._str_encode + '\n\n' + self._str_set_get[:-1] + self._str_end

			with open(self._filename, 'w+') as fd:
				fd.write(content)
		elif self._mess_name.startswith('S'):
			content = self._str_head + '\n' + self._str_priv_var + '\n\n' + self._str_decode + '\n\n' + self._str_set_get[:-1] + self._str_end

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
