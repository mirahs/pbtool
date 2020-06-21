module("ReqSceneEnterFly", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = ReqSceneEnterFly})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.map_id = 0
end


function encode(self)
	 local pack = packet.new()
	pack:writeU32(self.map_id)
	return pack:encode(Msg.P_REQ_SCENE_ENTER_FLY)
end
