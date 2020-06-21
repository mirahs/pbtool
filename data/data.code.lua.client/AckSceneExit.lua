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


function decode(self, pack)
	self.uid = pack:readU32()
	return self
end

return AckSceneExit
