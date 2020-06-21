module("MsgSceneVector3", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = MsgSceneVector3})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.x = 0
	self.y = 0
	self.z = 0
end


function encode(self)
	local pack = packet.new()
	pack:writeI16(self.x)
	pack:writeI16(self.y)
	pack:writeI16(self.z)
	return pack:readBytes()
end

function decode(self, pack)
	self.x = pack:readI16()
	self.y = pack:readI16()
	self.z = pack:readI16()
	return self
end

function getBytes(self)
	return self:encode()
end

return MsgSceneVector3
