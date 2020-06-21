module("ReqRoleLogin", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = ReqRoleLogin})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.uid = 0
	self.uuid = 0
	self.sid = 0
	self.cid = 0
	self.login_time = 0
	self.pwd = 0
	self.relink = 0
	self.debug = 0
	self.os = 0
	self.version = 0
end


function encode(self)
	local pack = packet.new()
	pack:writeU32(self.uid)
	pack:writeU32(self.uuid)
	pack:writeU16(self.sid)
	pack:writeU16(self.cid)
	pack:writeU32(self.login_time)
	pack:writeString(self.pwd)
	pack:writeU8(self.relink)
	pack:writeU8(self.debug)
	pack:writeString(self.os)
	pack:writeString(self.version)
	return pack:encode(Msg.P_REQ_ROLE_LOGIN)
end

return ReqRoleLogin
