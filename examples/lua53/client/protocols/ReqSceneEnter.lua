local M = {}
local moduleName = ...
_G[moduleName] = M
setmetatable(M, {__index = _G})
local _ENV = M


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = ReqSceneEnter})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.door_id = 0
end


function encode(self)
	pack = packet.new()
	pack:writeU32(self.door_id)
	return pack:encode(Msg.P_REQ_SCENE_ENTER)
end


function setDoorId(self, door_id)
	self.door_id = door_id
end

