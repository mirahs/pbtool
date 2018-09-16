#!/usr/bin/env python
# coding:utf-8
from sys import path
path.append(r'../')

from proto_lua53 import ProtoLua, protocol_msg


def parse(code_path, common_path, protos, _tmp_protos_file):
	name_ids	= list()
	for proto in protos:
		name_id	= dict()
		name_id['mess_name']	= proto['mess_name']
		name_id['mess_id'] 		= proto['mess_id']
		name_id['mess_note'] 	= proto['mess_note']
		name_ids.append(name_id)
		ProtoLua(code_path, proto).do_server()

		protocol_msg(code_path, name_ids)
