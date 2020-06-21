module("MsgSceneRotPos", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = MsgSceneRotPos})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.rot_x = 0
	self.rot_y = 0
	self.rot_z = 0
	self.pos_x = 0
	self.pos_y = 0
	self.pos_z = 0
end


function encode(self)
	local pack = packet.new()
	pack:writeI16(self.rot_x)
	pack:writeI16(self.rot_y)
	pack:writeI16(self.rot_z)
	pack:writeI16(self.pos_x)
	pack:writeI16(self.pos_y)
	pack:writeI16(self.pos_z)
	return pack:readBytes()
end

function decode(self, pack)
	self.rot_x = pack:readI16()
	self.rot_y = pack:readI16()
	self.rot_z = pack:readI16()
	self.pos_x = pack:readI16()
	self.pos_y = pack:readI16()
	self.pos_z = pack:readI16()
	return self
end

function getBytes(self)
	return self:encode()
end

return MsgSceneRotPos
