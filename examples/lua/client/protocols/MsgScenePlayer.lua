module("MsgScenePlayer", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = MsgScenePlayer})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.uid = 0
	self.scene_rot_pos = nil
end


function encode(self)
	 local pack = packet.new()
	pack:writeU32(self.uid)
	pack:writeBytes(self.scene_rot_pos:getBytes())
	return pack:readBytes()
end

function decode(self, pack)
	self.uid = pack:readU32()
	self.scene_rot_pos = MsgSceneRotPos.new():decode(pack)
	return self
end

function getBytes(self)
	return self:encode()
end
