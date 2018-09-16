#!/usr/bin/python
# coding:utf-8
from utils import tool


def protocol_const(common_path, mess_name_ids):
	file_name 		= common_path + 'const.pb.hrl'

	_str_content 	= '%% 1 - 500 (预留)\n'
	_str_content 	+= '-define(P_XX_KEEP_END,'.ljust(40, chr(32)) + '500).\n'

	for mess_name_id in mess_name_ids:
		mess_name = mess_name_id['mess_name']
		if mess_name.startswith('S') or mess_name.startswith('C'):
			mess_name 	= 'P_' + tool.camel_to_underline(mess_name).upper()
			mess_id 	= mess_name_id['mess_id']
			_str_tmp 	= '-define(' + mess_name + ','
			_str_content+= (_str_tmp.ljust(40, chr(32)) + mess_id + ').').ljust(47, chr(32)) + '% ' + mess_name_id['mess_note'] + '\n'

	with open(file_name, 'w+') as fd:
		fd.write(_str_content)


def protocol_record_proto(proto):
	mess_name = proto['mess_name']
	mess_note = proto['mess_note']
	if mess_name.startswith('C'):
		record_name = 'req_' + tool.camel_to_underline(mess_name[1:])
	elif mess_name.startswith('S'):
		record_name = 'ack_' + tool.camel_to_underline(mess_name[1:])
	else:
		record_name = tool.camel_to_underline(mess_name)

	_str_record = '%% ' + mess_note + '\n'
	_str_record += '-record(' + record_name + ', {\n'

	_str_field  = ''
	fields_len	= len(proto['mess_fields'])
	idx_last	= fields_len - 1
	for i in range(fields_len):
		mess_field	= proto['mess_fields'][i]
		field_op   	= mess_field['field_op']
		field_type 	= mess_field['field_type']
		field_name 	= mess_field['field_name']
		field_note 	= mess_field['field_note']
		field_note 	= '% ' + field_note + '\n'
		default_val	= field_default_value(field_op, field_type)
		if i == idx_last:
			field_content = (field_name.ljust(15, chr(32)) + ' = ' + default_val).ljust(30, chr(32))
		else:
			field_content = (field_name.ljust(15, chr(32)) + ' = ' + default_val + ',').ljust(30, chr(32))
		_str_field += '\t' + field_content + field_note

	return _str_record + _str_field[:-1] + '\n}).\n\n'


def field_default_value(field_op, field_type):
	if field_op == 'optional':
		return 'undefined'
	elif field_op == 'repeated':
		return '[]'
	else:
		if field_type == 'string':
			return '<<>>'
		else:
			return '0'


class ProtoErlang(object):
	def __init__(self, proto):
		self._proto 		= proto

		self._mess_name 	= self._proto['mess_name']
		self._mess_id       = self._proto['mess_id']
		self._mess_note 	= self._proto['mess_note']

		self._str_mess_note = '%% ' + self._mess_note + '\n'
		self._set_decode()
		self._set_encode()
		self._set_proto_encode()
		self._set_proto_decode()

	def _set_decode(self):
		if 'proto_specs' in self._proto and 'record' in self._proto['proto_specs']:
			record = self._proto['proto_specs']['record']

			self._str_decode = '#' + record + '{'
			_str_tmp = ''
			for mess_field in self._proto['mess_fields']:
				field_name = mess_field['field_name']
				field_var_name = tool.underline_to_camel(field_name)
				_str_tmp += field_name + '=' + field_var_name + ','

			self._str_decode = self._str_decode + _str_tmp[:-1] + '}'
		else:
			self._str_decode = '{'
			_str_tmp = ''
			for mess_field in self._proto['mess_fields']:
				field_name      = mess_field['field_name']
				field_var_name  = tool.underline_to_camel(field_name)
				_str_tmp += field_var_name + ','

			self._str_decode = self._str_decode + _str_tmp[:-1] + '}'

	def _set_encode(self):
		if 'proto_specs' in self._proto and 'record' in self._proto['proto_specs']:
			record = self._proto['proto_specs']['record']

			self._str_encode = ''
			_str_tmp = ''
			for mess_field in self._proto['mess_fields']:
				field_name = mess_field['field_name']
				field_var_name = tool.underline_to_camel(field_name)
				_str_tmp += field_name + '=' + field_var_name + ','

			self._str_encode = '#' + record + '{' + _str_tmp[:-1] + '}'
		else:
			self._str_encode = ''
			_str_tmp = ''
			for mess_field in self._proto['mess_fields']:
				field_name      = mess_field['field_name']
				field_var_name 	= tool.underline_to_camel(field_name)
				_str_tmp += field_var_name + ','

			self._str_encode = '{' + _str_tmp[:-1] + '}'

	def _set_proto_encode(self):
		self._str_proto_encode = ''
		_idx_bin    = 0
		for mess_field in self._proto['mess_fields']:
			_idx_bin 	+= 1

			field_op 	= mess_field['field_op']
			field_type 	= mess_field['field_type']
			field_name 	= mess_field['field_name']

			_field_var_name = tool.underline_to_camel(field_name)

			if 'required' == field_op:
				if field_type.startswith('Msg'):
					_str_tmp = 'Bin' + str(_idx_bin) + ' = pb_struct:pack_' + tool.camel_to_underline(
						field_type) + '(' + _field_var_name + '),\n\t'
				else:
					_str_tmp = 'Bin' + str(_idx_bin) + ' = ?E(' + field_type + ', ' + _field_var_name + '),\n\t'

				self._str_proto_encode += _str_tmp

			if 'repeated' == field_op:
				_str_tmp = ''

				_str_fun_name = 'Fun' + _field_var_name
				_str_tmp += _str_fun_name + ' = fun(F' + _field_var_name + ', {CountAcc, BinAcc}) ->\n\t\t\t'
				if field_type.startswith('Msg'):
					_str_tmp += 'FBin = pb_struct:pack_' + tool.camel_to_underline(
						field_type) + '(F' + _field_var_name + '),\n\t\t\t'
				else:
					_str_tmp += 'FBin = ?E(' + field_type + ', F' + _field_var_name + '),\n\t\t\t'

				_str_tmp += '{CountAcc + 1, <<BinAcc/binary,FBin/binary>>}\n\t'
				_str_tmp += 'end,\n\t'
				_str_tmp += '{Count' + _field_var_name + ', Bin' + _field_var_name + '} = lists:foldl(' + _str_fun_name + ', {0, <<>>}, ' + _field_var_name + '),\n\t'
				_str_tmp += 'Bin' + str(_idx_bin) + ' = ?E(u16, ' + 'Count' + _field_var_name + '),\n\t'

				_idx_bin += 1

				_str_tmp += 'Bin' + str(_idx_bin) + ' = Bin' + _field_var_name + ',\n\t'

				self._str_proto_encode += _str_tmp

			if 'optional' == field_op:
				_str_tmp = 'Bin' + str(_idx_bin) + ' = \n\t\t'

				_str_tmp += 'case ' + _field_var_name + ' of\n\t\t\t'
				_str_tmp += 'undefined ->\n\t\t\t\t'
				_str_tmp += '?E(u8, 0);\n\t\t\t'
				_str_tmp += '_ ->\n\t\t\t\t'
				_str_tmp += 'Bin' + _field_var_name + 'Flag = ?E(u8, 1),\n\t\t\t\t'
				if field_type.startswith('Msg'):
					_str_tmp += 'Bin' + _field_var_name + ' = pb_struct:pack_' + tool.camel_to_underline(
						field_type) + '(' + _field_var_name + '),\n\t\t\t\t'
				else:
					_str_tmp += 'Bin' + _field_var_name + '= ?E(' + field_type + ', ' + _field_var_name + '),\n\t\t\t\t'

				_str_tmp += '<<Bin' + _field_var_name + 'Flag/binary,Bin' + _field_var_name + '/binary>>\n\t\t'
				_str_tmp += 'end,\n\t'
				self._str_proto_encode += _str_tmp

		self._str_bin_encode = ''
		for i in range(1, _idx_bin + 1):
			self._str_bin_encode += 'Bin' + str(i) + '/binary,'

		self._str_bin_encode = '<<' + self._str_bin_encode[:-1] + '>>'

	def _set_proto_decode(self):
		self._str_proto_decode = ''

		_idx_bin = 0
		for mess_field in self._proto['mess_fields']:
			_idx_bin_pre= _idx_bin
			_idx_bin 	+= 1

			field_op 	= mess_field['field_op']
			field_type 	= mess_field['field_type']
			field_name 	= mess_field['field_name']

			_field_var_name = tool.underline_to_camel(field_name)

			if 'required' == field_op:
				if field_type.startswith('Msg'):
					_str_tmp = '{' + _field_var_name + ', _Bin' + str(_idx_bin) + '} = pb_struct:unpack_' + tool.camel_to_underline(
						field_type) + '(_Bin' + str(_idx_bin_pre) + '),\n\t'
				else:
					_str_tmp = '{' + _field_var_name + ', _Bin' + str(_idx_bin) + '} = ?D(' + field_type + ', _Bin' + str(
						_idx_bin_pre) + '),\n\t'

				self._str_proto_decode += _str_tmp

			if 'repeated' == field_op:
				_str_tmp = '{' + _field_var_name + 'Count, _Bin' + str(_idx_bin) + '} = ?D(u16' + ', _Bin' + str(
					_idx_bin_pre) + '),\n\t'

				_idx_bin_pre = _idx_bin
				_idx_bin += 1

				_str_fun_name = 'Fun' + _field_var_name
				_str_tmp += _str_fun_name + ' = fun(_, {' + _field_var_name + 'Acc, _Bin' + _field_var_name + 'Acc}) ->\n\t\t\t\t'
				_str_tmp += '{Fun' + _field_var_name + ', _Bin' + _field_var_name + 'Acc2} = '
				if field_type.startswith('Msg'):
					_str_tmp += 'pb_struct:unpack_' + tool.camel_to_underline(field_type) + '(_Bin' + _field_var_name + 'Acc),\n\t\t\t\t'
				else:
					_str_tmp += '?D(' + field_type + ', _Bin' + _field_var_name + 'Acc),\n\t\t\t\t'

				_str_tmp += '{[Fun' + _field_var_name + '|' + _field_var_name + 'Acc], _Bin' + _field_var_name + 'Acc2}\n\t\t\t'
				_str_tmp += 'end,\n\t'
				_str_tmp += '{' + _field_var_name + 'Tmp' + ', _Bin' + str(
					_idx_bin) + '} = lists:foldl(' + _str_fun_name + ', {[], _Bin' + str(
					_idx_bin_pre) + '}, lists:duplicate(' + _field_var_name + 'Count, 0)),\n\t'
				_str_tmp += _field_var_name + ' = lists:reverse(' + _field_var_name + 'Tmp),\n\t'

				self._str_proto_decode += _str_tmp

			if 'optional' == field_op:
				_str_tmp = '{' + _field_var_name + 'Flag, _Bin' + str(_idx_bin) + '} = ?D(u8' + ', _Bin' + str(
					_idx_bin_pre) + '),\n\t'

				_idx_bin_pre = _idx_bin
				_idx_bin += 1

				_str_tmp += '{' + _field_var_name + ', _Bin' + str(_idx_bin) + '} =\n\t'
				_str_tmp += 'case ' + _field_var_name + 'Flag of\n\t\t'
				_str_tmp += '0 ->\n\t\t\t'
				_str_tmp += '{undefined, _Bin' + str(_idx_bin_pre) + '};\n\t\t'
				_str_tmp += '1 ->\n\t\t\t'
				if field_type.startswith('Msg'):
					_str_tmp += 'pb_struct:unpack_' + tool.camel_to_underline(field_type) + '(_Bin' + str(_idx_bin_pre) + ')\n\t'
				else:
					_str_tmp += '?D(' + field_type + ', _Bin' + str(_idx_bin_pre) + ')\n\t'

				_str_tmp += 'end,\n\t'
				self._str_proto_decode += _str_tmp

		self._str_return_bin = 'Bin' + str(_idx_bin)

	def do_pack(self):
		if self._mess_name.startswith('Msg'):
			str_msg = self._str_bin_encode + ''
			return self._str_mess_note + 'pack_' + tool.camel_to_underline(self._mess_name) + '(' + self._str_decode + ') ->\n\t' + self._str_proto_encode + str_msg
		else:
			str_msg = 'BinData = ' + self._str_bin_encode + ',\n\t'
			str_msg += '{ok, ?MSG(' + str(self._mess_id) + ', BinData)}'
			return self._str_mess_note + 'pack(' + self._mess_id + ' ,' + self._str_decode + ') ->\n\t' + self._str_proto_encode + str_msg

	def do_unpack(self):
		if self._mess_name.startswith('Msg'):
			return self._str_mess_note + 'unpack_' + tool.camel_to_underline(self._mess_name) + '(_Bin0) ->\n\t' + self._str_proto_decode + '{' + self._str_decode + ', _' + self._str_return_bin + '}'
		else:
			return self._str_mess_note + 'unpack(' + self._mess_id + ', _Bin0) ->\n\t' + self._str_proto_decode + '{ok, ' + self._str_decode + '}'
