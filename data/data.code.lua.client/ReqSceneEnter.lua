module("ReqSceneEnter", package.seeall)


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
	local pack = packet.new()
	pack:writeU32(self.door_id)
	return pack:encode(Msg.P_REQ_SCENE_ENTER)
end

return ReqSceneEnter
