local M = {}
local moduleName = ...
_G[moduleName] = M
setmetatable(M, {__index = _G})
local _ENV = M


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = AckRoleRandNameOk})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.uname = 0
end


function decode(self, pack)
	self.uname = pack:readString()
	return self
end


function getUname(self)
	return self.uname
end

