#!/usr/bin/python
# coding:utf-8
import os
import string
import re
import fileinput


def parse(filename):
	print 'filename:', filename

	_is_begin_mess	= False
	_includes		= []
	_protos         = []
	_mess_body		= dict()

	_include_com	= re.compile(r'include:(.*)')  # 头文件包含(erlang) include:role,map
	_mess_com       = re.compile(r'\s*message\s*(\w+)\((\d+)\)\s*(.*)')  # 协议格式(协议名称,协议id,协议注释)
	_note_com       = re.compile(r'\s*/.*')     # 注释行
	_left_com       = re.compile(r'\s*\{.*')    # 左大括号
	_right_com      = re.compile(r'\s*}.*')     # 右大括号
	_field_com		= re.compile(r'\s*(\w+)\s*([\w\d]+)\s*([\w\d]+)\s*(.*)')	 # 协议每个字段
	_proto_spec_com	= re.compile(r'\[(.*)\](.*)')  # 协议特殊标识 //[record:play_idx_result]这是协议注释

	for line in fileinput.input(filename):
		if _mess_body:
			if len(string.strip(line)) == 0:  # 空行
				continue
			m = _note_com.match(line)   # 注释行
			if m:
				continue
			m = _left_com.match(line)    # 左大括号
			if m:
				continue
			m = _right_com.match(line)   # 右大括号(一条协议解析完毕)
			# 把协议体添加到protocols里面
			if m:
				_protos.append(_mess_body)

				# 清空协议内容
				_mess_body = dict()
				continue

			line = _field_com.match(line)
			if line:
				# 处理协议内的字段
				field_body = dict()

				field_op	= string.strip(line.group(1))  		# 字段说明
				field_type	= string.strip(line.group(2))  		# 字段类型
				field_name	= string.strip(line.group(3))  		# 字段名称
				field_note	= string.strip(line.group(4), '/')  # 字段注释

				field_body['field_op']		= field_op
				field_body['field_type']	= field_type
				field_body['field_note']	= field_note

				field_body['field_name']	= field_name
				_mess_body['mess_fields'].append(field_body)

		else:
			if not _is_begin_mess:
				m_include = _include_com.match(line)  # 匹配包含
				if m_include:
					_includes = m_include.group(1).split(',')

			m = _mess_com.match(line)   # 匹配协议格式
			if m:
				_is_begin_mess = True

				_mess_body['mess_file']		= os.path.basename(filename).split('.')[0]
				_mess_body['mess_name']     = string.strip(m.group(1))          # 协议名称
				_mess_body['mess_id']       = string.strip(m.group(2))          # 协议id

				note = string.strip(m.group(3), '/')
				m2 = _proto_spec_com.match(note)
				if m2:
					_mess_body['mess_note'] = string.strip(m2.group(2))  		# 协议注释
					proto_specs = {}
					specs = m2.group(1)
					specs = specs.split(',')
					for spec in specs:
						spec2 = spec.split(':')
						if len(spec2) == 2:
							proto_specs[spec2[0]] = spec2[1]
					_mess_body['proto_specs'] = proto_specs
				else:
					_mess_body['mess_note'] = note  							# 协议注释

				_mess_body['mess_fields']   = list()                            # 协议字段

	return {'includes': _includes, 'protos': _protos}
