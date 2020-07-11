module("AckRoleRandNameOk", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = AckRoleRandNameOk})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.uname = ""
end


function decode(self, pack)
	self.uname = pack:readString()
	return self
end

return AckRoleRandNameOk
