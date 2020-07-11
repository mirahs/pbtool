module("ReqRoleCreate", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = ReqRoleCreate})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.uid = 0
	self.uuid = 0
	self.sid = 0
	self.cid = 0
	self.os = ""
	self.version = ""
	self.uname = ""
	self.source = ""
	self.source_sub = ""
	self.login_time = 0
end


function encode(self)
	local pack = packet.new()
	pack:writeU32(self.uid)
	pack:writeU32(self.uuid)
	pack:writeU16(self.sid)
	pack:writeU16(self.cid)
	pack:writeString(self.os)
	pack:writeString(self.version)
	pack:writeString(self.uname)
	pack:writeString(self.source)
	pack:writeString(self.source_sub)
	pack:writeU32(self.login_time)
	return pack:encode(Msg.P_REQ_ROLE_CREATE)
end

return ReqRoleCreate
