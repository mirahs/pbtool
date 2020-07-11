module("AckRoleLoginOk", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = AckRoleLoginOk})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.uname = ""
end


function encode(self)
	local pack = packet.new()
	pack:writeString(self.uname)
	return pack:encode(Msg.P_ACK_ROLE_LOGIN_OK)
end
