module("AckSceneExit", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = AckSceneExit})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.uid = 0
end


function encode(self)
	local pack = packet.new()
	pack:writeU32(self.uid)
	return pack:encode(Msg.P_ACK_SCENE_EXIT)
end
