#!/usr/bin/env python
# coding:utf-8
from sys import path
path.append(r'../')

from network.Packet import Packet
import msg


class ReqChatSend(object):
	__channel = 0
	__dest_uid = 0
	__content = ''

	def encode(self):
		packet = Packet()
		packet.write_u8(self.__channel)
		packet.write_u32(self.__dest_uid)
		packet.write_string(self.__content)
		return packet.encode(msg.P_REQ_CHAT_SEND)

	@property
	def channel(self):
		return self.__channel
	@channel.setter
	def channel(self, value):
		self.__channel = value

	@property
	def dest_uid(self):
		return self.__dest_uid
	@dest_uid.setter
	def dest_uid(self, value):
		self.__dest_uid = value

	@property
	def content(self):
		return self.__content
	@content.setter
	def content(self, value):
		self.__content = value


class AckChatSendOk(object):
	__channel = 0
	__uid = 0
	__uname = ''
	__content = ''

	def __init__(self, packet):
		self.decode(packet)

	def decode(self, packet):
		self.__channel = packet.read_u8()
		self.__uid = packet.read_u32()
		self.__uname = packet.read_string()
		self.__content = packet.read_string()

	@property
	def channel(self):
		return self.__channel
	@channel.getter
	def channel(self):
		return self.__channel

	@property
	def uid(self):
		return self.__uid
	@uid.getter
	def uid(self):
		return self.__uid

	@property
	def uname(self):
		return self.__uname
	@uname.getter
	def uname(self):
		return self.__uname

	@property
	def content(self):
		return self.__content
	@content.getter
	def content(self):
		return self.__content


class ReqChatGm(object):
	__content = ''

	def encode(self):
		packet = Packet()
		packet.write_string(self.__content)
		return packet.encode(msg.P_REQ_CHAT_GM)

	@property
	def content(self):
		return self.__content
	@content.setter
	def content(self, value):
		self.__content = value


class ReqRoleLogin(object):
	__uid = 0
	__uuid = 0
	__sid = 0
	__cid = 0
	__login_time = 0
	__pwd = ''
	__relink = 0
	__debug = 0
	__os = ''
	__version = ''

	def encode(self):
		packet = Packet()
		packet.write_u32(self.__uid)
		packet.write_u32(self.__uuid)
		packet.write_u16(self.__sid)
		packet.write_u16(self.__cid)
		packet.write_u32(self.__login_time)
		packet.write_string(self.__pwd)
		packet.write_u8(self.__relink)
		packet.write_u8(self.__debug)
		packet.write_string(self.__os)
		packet.write_string(self.__version)
		return packet.encode(msg.P_REQ_ROLE_LOGIN)

	@property
	def uid(self):
		return self.__uid
	@uid.setter
	def uid(self, value):
		self.__uid = value

	@property
	def uuid(self):
		return self.__uuid
	@uuid.setter
	def uuid(self, value):
		self.__uuid = value

	@property
	def sid(self):
		return self.__sid
	@sid.setter
	def sid(self, value):
		self.__sid = value

	@property
	def cid(self):
		return self.__cid
	@cid.setter
	def cid(self, value):
		self.__cid = value

	@property
	def login_time(self):
		return self.__login_time
	@login_time.setter
	def login_time(self, value):
		self.__login_time = value

	@property
	def pwd(self):
		return self.__pwd
	@pwd.setter
	def pwd(self, value):
		self.__pwd = value

	@property
	def relink(self):
		return self.__relink
	@relink.setter
	def relink(self, value):
		self.__relink = value

	@property
	def debug(self):
		return self.__debug
	@debug.setter
	def debug(self, value):
		self.__debug = value

	@property
	def os(self):
		return self.__os
	@os.setter
	def os(self, value):
		self.__os = value

	@property
	def version(self):
		return self.__version
	@version.setter
	def version(self, value):
		self.__version = value


class ReqRoleCreate(object):
	__uid = 0
	__uuid = 0
	__sid = 0
	__cid = 0
	__os = ''
	__version = ''
	__uname = ''
	__source = ''
	__source_sub = ''
	__login_time = 0

	def encode(self):
		packet = Packet()
		packet.write_u32(self.__uid)
		packet.write_u32(self.__uuid)
		packet.write_u16(self.__sid)
		packet.write_u16(self.__cid)
		packet.write_string(self.__os)
		packet.write_string(self.__version)
		packet.write_string(self.__uname)
		packet.write_string(self.__source)
		packet.write_string(self.__source_sub)
		packet.write_u32(self.__login_time)
		return packet.encode(msg.P_REQ_ROLE_CREATE)

	@property
	def uid(self):
		return self.__uid
	@uid.setter
	def uid(self, value):
		self.__uid = value

	@property
	def uuid(self):
		return self.__uuid
	@uuid.setter
	def uuid(self, value):
		self.__uuid = value

	@property
	def sid(self):
		return self.__sid
	@sid.setter
	def sid(self, value):
		self.__sid = value

	@property
	def cid(self):
		return self.__cid
	@cid.setter
	def cid(self, value):
		self.__cid = value

	@property
	def os(self):
		return self.__os
	@os.setter
	def os(self, value):
		self.__os = value

	@property
	def version(self):
		return self.__version
	@version.setter
	def version(self, value):
		self.__version = value

	@property
	def uname(self):
		return self.__uname
	@uname.setter
	def uname(self, value):
		self.__uname = value

	@property
	def source(self):
		return self.__source
	@source.setter
	def source(self, value):
		self.__source = value

	@property
	def source_sub(self):
		return self.__source_sub
	@source_sub.setter
	def source_sub(self, value):
		self.__source_sub = value

	@property
	def login_time(self):
		return self.__login_time
	@login_time.setter
	def login_time(self, value):
		self.__login_time = value


class ReqRoleRandName(object):

	def encode(self):
		packet = Packet()
		return packet.encode(msg.P_REQ_ROLE_RAND_NAME)



class AckRoleRandNameOk(object):
	__uname = ''

	def __init__(self, packet):
		self.decode(packet)

	def decode(self, packet):
		self.__uname = packet.read_string()

	@property
	def uname(self):
		return self.__uname
	@uname.getter
	def uname(self):
		return self.__uname


class AckRoleLoginOk(object):
	__uname = ''

	def __init__(self, packet):
		self.decode(packet)

	def decode(self, packet):
		self.__uname = packet.read_string()

	@property
	def uname(self):
		return self.__uname
	@uname.getter
	def uname(self):
		return self.__uname


class AckRoleLoginOkNoRole(object):

	def __init__(self, packet):
		self.decode(packet)

	def decode(self, packet):
		pass



class ReqSceneEnterFly(object):
	__map_id = 0

	def encode(self):
		packet = Packet()
		packet.write_u32(self.__map_id)
		return packet.encode(msg.P_REQ_SCENE_ENTER_FLY)

	@property
	def map_id(self):
		return self.__map_id
	@map_id.setter
	def map_id(self, value):
		self.__map_id = value


class ReqSceneEnter(object):
	__door_id = 0

	def encode(self):
		packet = Packet()
		packet.write_u32(self.__door_id)
		return packet.encode(msg.P_REQ_SCENE_ENTER)

	@property
	def door_id(self):
		return self.__door_id
	@door_id.setter
	def door_id(self, value):
		self.__door_id = value


class ReqSceneMove(object):
	__scene_rot_pos = None
	__forward = None
	__ani_name = ''
	__x_axis = 0

	def encode(self):
		packet = Packet()
		packet.write_bytes(self.__scene_rot_pos.get_bytes())
		packet.write_bytes(self.__forward.get_bytes())
		packet.write_string(self.__ani_name)
		packet.write_i16(self.__x_axis)
		return packet.encode(msg.P_REQ_SCENE_MOVE)

	@property
	def scene_rot_pos(self):
		return self.__scene_rot_pos
	@scene_rot_pos.setter
	def scene_rot_pos(self, value):
		self.__scene_rot_pos = value

	@property
	def forward(self):
		return self.__forward
	@forward.setter
	def forward(self, value):
		self.__forward = value

	@property
	def ani_name(self):
		return self.__ani_name
	@ani_name.setter
	def ani_name(self, value):
		self.__ani_name = value

	@property
	def x_axis(self):
		return self.__x_axis
	@x_axis.setter
	def x_axis(self, value):
		self.__x_axis = value


class AckSceneEnter(object):
	__player = None

	def __init__(self, packet):
		self.decode(packet)

	def decode(self, packet):
		self.__player = MsgScenePlayer(packet)

	@property
	def player(self):
		return self.__player
	@player.getter
	def player(self):
		return self.__player


class AckScenePlayers(object):
	__players = []

	def __init__(self, packet):
		self.decode(packet)

	def decode(self, packet):
		players_count = packet.read_u16()
		for i in range(players_count):
			self.__players.append(MsgScenePlayer(packet))

	@property
	def players(self):
		return self.__players
	@players.getter
	def players(self):
		return self.__players


class AckSceneExit(object):
	__uid = 0

	def __init__(self, packet):
		self.decode(packet)

	def decode(self, packet):
		self.__uid = packet.read_u32()

	@property
	def uid(self):
		return self.__uid
	@uid.getter
	def uid(self):
		return self.__uid


class ReqSceneReqPlayers(object):

	def encode(self):
		packet = Packet()
		return packet.encode(msg.P_REQ_SCENE_REQ_PLAYERS)



class AckSceneMove(object):
	__scene_rot_pos = None
	__forward = None
	__ani_name = ''
	__x_axis = 0
	__uid = 0

	def __init__(self, packet):
		self.decode(packet)

	def decode(self, packet):
		self.__scene_rot_pos = MsgSceneRotPos(packet)
		self.__forward = MsgSceneVector3(packet)
		self.__ani_name = packet.read_string()
		self.__x_axis = packet.read_i16()
		self.__uid = packet.read_u32()

	@property
	def scene_rot_pos(self):
		return self.__scene_rot_pos
	@scene_rot_pos.getter
	def scene_rot_pos(self):
		return self.__scene_rot_pos

	@property
	def forward(self):
		return self.__forward
	@forward.getter
	def forward(self):
		return self.__forward

	@property
	def ani_name(self):
		return self.__ani_name
	@ani_name.getter
	def ani_name(self):
		return self.__ani_name

	@property
	def x_axis(self):
		return self.__x_axis
	@x_axis.getter
	def x_axis(self):
		return self.__x_axis

	@property
	def uid(self):
		return self.__uid
	@uid.getter
	def uid(self):
		return self.__uid


class MsgRoleBase(object):
	__uid = 0
	__uname = ''

	def encode(self):
		packet = Packet()
		packet.write_u32(self.__uid)
		packet.write_string(self.__uname)
		return packet.read_bytes()

	def __init__(self, packet=None):
		if packet:
			self.decode(packet)

	def decode(self, packet):
		self.__uid = packet.read_u32()
		self.__uname = packet.read_string()

	def get_bytes(self):
		return self.encode()

	@property
	def uid(self):
		return self.__uid
	@uid.setter
	def uid(self, value):
		self.__uid = value
	@uid.getter
	def uid(self):
		return self.__uid

	@property
	def uname(self):
		return self.__uname
	@uname.setter
	def uname(self, value):
		self.__uname = value
	@uname.getter
	def uname(self):
		return self.__uname


class MsgFriendBaseAdd(object):
	__uid = 0
	__uname = ''

	def encode(self):
		packet = Packet()
		packet.write_u32(self.__uid)
		packet.write_string(self.__uname)
		return packet.read_bytes()

	def __init__(self, packet=None):
		if packet:
			self.decode(packet)

	def decode(self, packet):
		self.__uid = packet.read_u32()
		self.__uname = packet.read_string()

	def get_bytes(self):
		return self.encode()

	@property
	def uid(self):
		return self.__uid
	@uid.setter
	def uid(self, value):
		self.__uid = value
	@uid.getter
	def uid(self):
		return self.__uid

	@property
	def uname(self):
		return self.__uname
	@uname.setter
	def uname(self, value):
		self.__uname = value
	@uname.getter
	def uname(self):
		return self.__uname


class MsgSceneRotPos(object):
	__rot_x = 0
	__rot_y = 0
	__rot_z = 0
	__pos_x = 0
	__pos_y = 0
	__pos_z = 0

	def encode(self):
		packet = Packet()
		packet.write_i16(self.__rot_x)
		packet.write_i16(self.__rot_y)
		packet.write_i16(self.__rot_z)
		packet.write_i16(self.__pos_x)
		packet.write_i16(self.__pos_y)
		packet.write_i16(self.__pos_z)
		return packet.read_bytes()

	def __init__(self, packet=None):
		if packet:
			self.decode(packet)

	def decode(self, packet):
		self.__rot_x = packet.read_i16()
		self.__rot_y = packet.read_i16()
		self.__rot_z = packet.read_i16()
		self.__pos_x = packet.read_i16()
		self.__pos_y = packet.read_i16()
		self.__pos_z = packet.read_i16()

	def get_bytes(self):
		return self.encode()

	@property
	def rot_x(self):
		return self.__rot_x
	@rot_x.setter
	def rot_x(self, value):
		self.__rot_x = value
	@rot_x.getter
	def rot_x(self):
		return self.__rot_x

	@property
	def rot_y(self):
		return self.__rot_y
	@rot_y.setter
	def rot_y(self, value):
		self.__rot_y = value
	@rot_y.getter
	def rot_y(self):
		return self.__rot_y

	@property
	def rot_z(self):
		return self.__rot_z
	@rot_z.setter
	def rot_z(self, value):
		self.__rot_z = value
	@rot_z.getter
	def rot_z(self):
		return self.__rot_z

	@property
	def pos_x(self):
		return self.__pos_x
	@pos_x.setter
	def pos_x(self, value):
		self.__pos_x = value
	@pos_x.getter
	def pos_x(self):
		return self.__pos_x

	@property
	def pos_y(self):
		return self.__pos_y
	@pos_y.setter
	def pos_y(self, value):
		self.__pos_y = value
	@pos_y.getter
	def pos_y(self):
		return self.__pos_y

	@property
	def pos_z(self):
		return self.__pos_z
	@pos_z.setter
	def pos_z(self, value):
		self.__pos_z = value
	@pos_z.getter
	def pos_z(self):
		return self.__pos_z


class MsgScenePlayer(object):
	__uid = 0
	__scene_rot_pos = None

	def encode(self):
		packet = Packet()
		packet.write_u32(self.__uid)
		packet.write_bytes(self.__scene_rot_pos.get_bytes())
		return packet.read_bytes()

	def __init__(self, packet=None):
		if packet:
			self.decode(packet)

	def decode(self, packet):
		self.__uid = packet.read_u32()
		self.__scene_rot_pos = MsgSceneRotPos(packet)

	def get_bytes(self):
		return self.encode()

	@property
	def uid(self):
		return self.__uid
	@uid.setter
	def uid(self, value):
		self.__uid = value
	@uid.getter
	def uid(self):
		return self.__uid

	@property
	def scene_rot_pos(self):
		return self.__scene_rot_pos
	@scene_rot_pos.setter
	def scene_rot_pos(self, value):
		self.__scene_rot_pos = value
	@scene_rot_pos.getter
	def scene_rot_pos(self):
		return self.__scene_rot_pos


class MsgSceneVector3(object):
	__x = 0
	__y = 0
	__z = 0

	def encode(self):
		packet = Packet()
		packet.write_i16(self.__x)
		packet.write_i16(self.__y)
		packet.write_i16(self.__z)
		return packet.read_bytes()

	def __init__(self, packet=None):
		if packet:
			self.decode(packet)

	def decode(self, packet):
		self.__x = packet.read_i16()
		self.__y = packet.read_i16()
		self.__z = packet.read_i16()

	def get_bytes(self):
		return self.encode()

	@property
	def x(self):
		return self.__x
	@x.setter
	def x(self, value):
		self.__x = value
	@x.getter
	def x(self):
		return self.__x

	@property
	def y(self):
		return self.__y
	@y.setter
	def y(self, value):
		self.__y = value
	@y.getter
	def y(self):
		return self.__y

	@property
	def z(self):
		return self.__z
	@z.setter
	def z(self, value):
		self.__z = value
	@z.getter
	def z(self):
		return self.__z


class MsgTestXX(object):
	__id_u8 = 0
	__id_f32 = []
	__id_op_u8_flag = 0
	__id_op_u8 = 0

	def encode(self):
		packet = Packet()
		packet.write_u8(self.__id_u8)
		id_f32_count = len(self.__id_f32)
		packet.write_u16(id_f32_count)
		for i in range(id_f32_count):
			packet.write_f32(self.__id_f32[i])
		packet.write_u8(self.__id_op_u8_flag)
		if self.__id_op_u8_flag:
			packet.write_u8(self.__id_op_u8)
		return packet.read_bytes()

	def __init__(self, packet=None):
		if packet:
			self.decode(packet)

	def decode(self, packet):
		self.__id_u8 = packet.read_u8()
		id_f32_count = packet.read_u16()
		for i in range(id_f32_count):
			self.__id_f32.append(packet.read_f32())
		self.__id_op_u8_flag = packet.read_u8()
		if self.__id_op_u8_flag:
			self.__id_op_u8 = packet.read_u8()

	def get_bytes(self):
		return self.encode()

	@property
	def id_u8(self):
		return self.__id_u8
	@id_u8.setter
	def id_u8(self, value):
		self.__id_u8 = value
	@id_u8.getter
	def id_u8(self):
		return self.__id_u8

	@property
	def id_f32(self):
		return self.__id_f32
	@id_f32.setter
	def id_f32(self, value):
		self.__id_f32 = value
	@id_f32.getter
	def id_f32(self):
		return self.__id_f32

	@property
	def id_op_u8(self):
		return self.__id_op_u8
	@id_op_u8.setter
	def id_op_u8(self, value):
		self.__id_op_u8_flag = 1
		self.__id_op_u8 = value
	@id_op_u8.getter
	def id_op_u8(self):
		return self.__id_op_u8


class ReqTestSend(object):
	__id_u8 = 0
	__role_base = None
	__id_f32 = []
	__id_op_u8_flag = 0
	__id_op_u8 = 0
	__op_role_base_flag = 0
	__op_role_base = None

	def encode(self):
		packet = Packet()
		packet.write_u8(self.__id_u8)
		packet.write_bytes(self.__role_base.get_bytes())
		id_f32_count = len(self.__id_f32)
		packet.write_u16(id_f32_count)
		for i in range(id_f32_count):
			packet.write_f32(self.__id_f32[i])
		packet.write_u8(self.__id_op_u8_flag)
		if self.__id_op_u8_flag:
			packet.write_u8(self.__id_op_u8)
		packet.write_u8(self.__op_role_base_flag)
		if self.__op_role_base_flag:
			packet.write_bytes(self.__op_role_base.get_bytes())
		return packet.encode(msg.P_REQ_TEST_SEND)

	@property
	def id_u8(self):
		return self.__id_u8
	@id_u8.setter
	def id_u8(self, value):
		self.__id_u8 = value

	@property
	def role_base(self):
		return self.__role_base
	@role_base.setter
	def role_base(self, value):
		self.__role_base = value

	@property
	def id_f32(self):
		return self.__id_f32
	@id_f32.setter
	def id_f32(self, value):
		self.__id_f32 = value

	@property
	def id_op_u8(self):
		return self.__id_op_u8
	@id_op_u8.setter
	def id_op_u8(self, value):
		self.__id_op_u8_flag = 1
		self.__id_op_u8 = value

	@property
	def op_role_base(self):
		return self.__op_role_base
	@op_role_base.setter
	def op_role_base(self, value):
		self.__op_role_base_flag = 1
		self.__op_role_base = value


class AckTestSendOk(object):
	__id_u8 = 0
	__role_base = None
	__id_f32 = []
	__id_op_u8_flag = 0
	__id_op_u8 = 0
	__op_role_base_flag = 0
	__op_role_base = None

	def __init__(self, packet):
		self.decode(packet)

	def decode(self, packet):
		self.__id_u8 = packet.read_u8()
		self.__role_base = MsgRoleBase(packet)
		id_f32_count = packet.read_u16()
		for i in range(id_f32_count):
			self.__id_f32.append(packet.read_f32())
		self.__id_op_u8_flag = packet.read_u8()
		if self.__id_op_u8_flag:
			self.__id_op_u8 = packet.read_u8()
		self.__op_role_base_flag = packet.read_u8()
		if self.__op_role_base_flag:
			self.__op_role_base = MsgRoleBase(packet)

	@property
	def id_u8(self):
		return self.__id_u8
	@id_u8.getter
	def id_u8(self):
		return self.__id_u8

	@property
	def role_base(self):
		return self.__role_base
	@role_base.getter
	def role_base(self):
		return self.__role_base

	@property
	def id_f32(self):
		return self.__id_f32
	@id_f32.getter
	def id_f32(self):
		return self.__id_f32

	@property
	def id_op_u8(self):
		return self.__id_op_u8
	@id_op_u8.getter
	def id_op_u8(self):
		return self.__id_op_u8

	@property
	def op_role_base(self):
		return self.__op_role_base
	@op_role_base.getter
	def op_role_base(self):
		return self.__op_role_base


class MsgTestSend(object):
	__id_u8 = 0
	__role_base = None
	__id_f32 = []
	__id_op_u8_flag = 0
	__id_op_u8 = 0
	__op_role_base_flag = 0
	__op_role_base = None

	def encode(self):
		packet = Packet()
		packet.write_u8(self.__id_u8)
		packet.write_bytes(self.__role_base.get_bytes())
		id_f32_count = len(self.__id_f32)
		packet.write_u16(id_f32_count)
		for i in range(id_f32_count):
			packet.write_f32(self.__id_f32[i])
		packet.write_u8(self.__id_op_u8_flag)
		if self.__id_op_u8_flag:
			packet.write_u8(self.__id_op_u8)
		packet.write_u8(self.__op_role_base_flag)
		if self.__op_role_base_flag:
			packet.write_bytes(self.__op_role_base.get_bytes())
		return packet.read_bytes()

	def __init__(self, packet=None):
		if packet:
			self.decode(packet)

	def decode(self, packet):
		self.__id_u8 = packet.read_u8()
		self.__role_base = MsgRoleBase(packet)
		id_f32_count = packet.read_u16()
		for i in range(id_f32_count):
			self.__id_f32.append(packet.read_f32())
		self.__id_op_u8_flag = packet.read_u8()
		if self.__id_op_u8_flag:
			self.__id_op_u8 = packet.read_u8()
		self.__op_role_base_flag = packet.read_u8()
		if self.__op_role_base_flag:
			self.__op_role_base = MsgRoleBase(packet)

	def get_bytes(self):
		return self.encode()

	@property
	def id_u8(self):
		return self.__id_u8
	@id_u8.setter
	def id_u8(self, value):
		self.__id_u8 = value
	@id_u8.getter
	def id_u8(self):
		return self.__id_u8

	@property
	def role_base(self):
		return self.__role_base
	@role_base.setter
	def role_base(self, value):
		self.__role_base = value
	@role_base.getter
	def role_base(self):
		return self.__role_base

	@property
	def id_f32(self):
		return self.__id_f32
	@id_f32.setter
	def id_f32(self, value):
		self.__id_f32 = value
	@id_f32.getter
	def id_f32(self):
		return self.__id_f32

	@property
	def id_op_u8(self):
		return self.__id_op_u8
	@id_op_u8.setter
	def id_op_u8(self, value):
		self.__id_op_u8_flag = 1
		self.__id_op_u8 = value
	@id_op_u8.getter
	def id_op_u8(self):
		return self.__id_op_u8

	@property
	def op_role_base(self):
		return self.__op_role_base
	@op_role_base.setter
	def op_role_base(self, value):
		self.__op_role_base_flag = 1
		self.__op_role_base = value
	@op_role_base.getter
	def op_role_base(self):
		return self.__op_role_base


class ReqTestXX(object):
	__id_u8 = 0
	__id_u16 = 0
	__id_u32 = 0
	__repeat_id_u8 = []
	__optional_id_u8_flag = 0
	__optional_id_u8 = 0

	def encode(self):
		packet = Packet()
		packet.write_u8(self.__id_u8)
		packet.write_u16(self.__id_u16)
		packet.write_u32(self.__id_u32)
		repeat_id_u8_count = len(self.__repeat_id_u8)
		packet.write_u16(repeat_id_u8_count)
		for i in range(repeat_id_u8_count):
			packet.write_u8(self.__repeat_id_u8[i])
		packet.write_u8(self.__optional_id_u8_flag)
		if self.__optional_id_u8_flag:
			packet.write_u8(self.__optional_id_u8)
		return packet.encode(msg.P_REQ_TEST_X_X)

	@property
	def id_u8(self):
		return self.__id_u8
	@id_u8.setter
	def id_u8(self, value):
		self.__id_u8 = value

	@property
	def id_u16(self):
		return self.__id_u16
	@id_u16.setter
	def id_u16(self, value):
		self.__id_u16 = value

	@property
	def id_u32(self):
		return self.__id_u32
	@id_u32.setter
	def id_u32(self, value):
		self.__id_u32 = value

	@property
	def repeat_id_u8(self):
		return self.__repeat_id_u8
	@repeat_id_u8.setter
	def repeat_id_u8(self, value):
		self.__repeat_id_u8 = value

	@property
	def optional_id_u8(self):
		return self.__optional_id_u8
	@optional_id_u8.setter
	def optional_id_u8(self, value):
		self.__optional_id_u8_flag = 1
		self.__optional_id_u8 = value


class AckTestXX(object):
	__id_u8 = 0
	__id_u16 = 0
	__id_u32 = 0
	__repeat_id_u8 = []
	__optional_id_u8_flag = 0
	__optional_id_u8 = 0

	def __init__(self, packet):
		self.decode(packet)

	def decode(self, packet):
		self.__id_u8 = packet.read_u8()
		self.__id_u16 = packet.read_u16()
		self.__id_u32 = packet.read_u32()
		repeat_id_u8_count = packet.read_u16()
		for i in range(repeat_id_u8_count):
			self.__repeat_id_u8.append(packet.read_u8())
		self.__optional_id_u8_flag = packet.read_u8()
		if self.__optional_id_u8_flag:
			self.__optional_id_u8 = packet.read_u8()

	@property
	def id_u8(self):
		return self.__id_u8
	@id_u8.getter
	def id_u8(self):
		return self.__id_u8

	@property
	def id_u16(self):
		return self.__id_u16
	@id_u16.getter
	def id_u16(self):
		return self.__id_u16

	@property
	def id_u32(self):
		return self.__id_u32
	@id_u32.getter
	def id_u32(self):
		return self.__id_u32

	@property
	def repeat_id_u8(self):
		return self.__repeat_id_u8
	@repeat_id_u8.getter
	def repeat_id_u8(self):
		return self.__repeat_id_u8

	@property
	def optional_id_u8(self):
		return self.__optional_id_u8
	@optional_id_u8.getter
	def optional_id_u8(self):
		return self.__optional_id_u8


class ReqTestPhp(object):
	__u64 = 0
	__strxx = ''
	__msg_req = None
	__msg_opt_flag = 0
	__msg_opt = None
	__msg_rep = []

	def encode(self):
		packet = Packet()
		packet.write_u64(self.__u64)
		packet.write_string(self.__strxx)
		packet.write_bytes(self.__msg_req.get_bytes())
		packet.write_u8(self.__msg_opt_flag)
		if self.__msg_opt_flag:
			packet.write_bytes(self.__msg_opt.get_bytes())
		msg_rep_count = len(self.__msg_rep)
		packet.write_u16(msg_rep_count)
		for i in range(msg_rep_count):
			packet.write_bytes(self.__msg_rep[i].get_bytes())
		return packet.encode(msg.P_REQ_TEST_PHP)

	@property
	def u64(self):
		return self.__u64
	@u64.setter
	def u64(self, value):
		self.__u64 = value

	@property
	def strxx(self):
		return self.__strxx
	@strxx.setter
	def strxx(self, value):
		self.__strxx = value

	@property
	def msg_req(self):
		return self.__msg_req
	@msg_req.setter
	def msg_req(self, value):
		self.__msg_req = value

	@property
	def msg_opt(self):
		return self.__msg_opt
	@msg_opt.setter
	def msg_opt(self, value):
		self.__msg_opt_flag = 1
		self.__msg_opt = value

	@property
	def msg_rep(self):
		return self.__msg_rep
	@msg_rep.setter
	def msg_rep(self, value):
		self.__msg_rep = value


class AckTestPhpOk(object):
	__u64 = 0
	__strxx = ''
	__msg_req = None
	__msg_opt_flag = 0
	__msg_opt = None
	__msg_rep = []

	def __init__(self, packet):
		self.decode(packet)

	def decode(self, packet):
		self.__u64 = packet.read_u64()
		self.__strxx = packet.read_string()
		self.__msg_req = MsgTestPhp(packet)
		self.__msg_opt_flag = packet.read_u8()
		if self.__msg_opt_flag:
			self.__msg_opt = MsgTestPhp(packet)
		msg_rep_count = packet.read_u16()
		for i in range(msg_rep_count):
			self.__msg_rep.append(MsgTestPhp(packet))

	@property
	def u64(self):
		return self.__u64
	@u64.getter
	def u64(self):
		return self.__u64

	@property
	def strxx(self):
		return self.__strxx
	@strxx.getter
	def strxx(self):
		return self.__strxx

	@property
	def msg_req(self):
		return self.__msg_req
	@msg_req.getter
	def msg_req(self):
		return self.__msg_req

	@property
	def msg_opt(self):
		return self.__msg_opt
	@msg_opt.getter
	def msg_opt(self):
		return self.__msg_opt

	@property
	def msg_rep(self):
		return self.__msg_rep
	@msg_rep.getter
	def msg_rep(self):
		return self.__msg_rep


class ReqTestJs(object):
	__u64 = 0
	__i64 = 0

	def encode(self):
		packet = Packet()
		packet.write_u64(self.__u64)
		packet.write_i64(self.__i64)
		return packet.encode(msg.P_REQ_TEST_JS)

	@property
	def u64(self):
		return self.__u64
	@u64.setter
	def u64(self, value):
		self.__u64 = value

	@property
	def i64(self):
		return self.__i64
	@i64.setter
	def i64(self, value):
		self.__i64 = value


class AckTestJsOk(object):
	__u64 = 0
	__i64 = 0

	def __init__(self, packet):
		self.decode(packet)

	def decode(self, packet):
		self.__u64 = packet.read_u64()
		self.__i64 = packet.read_i64()

	@property
	def u64(self):
		return self.__u64
	@u64.getter
	def u64(self):
		return self.__u64

	@property
	def i64(self):
		return self.__i64
	@i64.getter
	def i64(self):
		return self.__i64


class MsgTestPhp(object):
	__u16 = 0

	def encode(self):
		packet = Packet()
		packet.write_u16(self.__u16)
		return packet.read_bytes()

	def __init__(self, packet=None):
		if packet:
			self.decode(packet)

	def decode(self, packet):
		self.__u16 = packet.read_u16()

	def get_bytes(self):
		return self.encode()

	@property
	def u16(self):
		return self.__u16
	@u16.setter
	def u16(self, value):
		self.__u16 = value
	@u16.getter
	def u16(self):
		return self.__u16
