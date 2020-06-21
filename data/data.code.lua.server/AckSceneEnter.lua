module("AckSceneEnter", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = AckSceneEnter})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.player = nil
end


function encode(self)
	local pack = packet.new()
	pack:writeBytes(self.player:getBytes())
	return pack:encode(Msg.P_ACK_SCENE_ENTER)
end
