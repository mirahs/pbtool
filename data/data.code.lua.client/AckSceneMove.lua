module("AckSceneMove", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = AckSceneMove})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.scene_rot_pos = nil
	self.forward = nil
	self.ani_name = 0
	self.x_axis = 0
	self.uid = 0
end


function decode(self, pack)
	self.scene_rot_pos = MsgSceneRotPos.new():decode(pack)
	self.forward = MsgSceneVector3.new():decode(pack)
	self.ani_name = pack:readString()
	self.x_axis = pack:readI16()
	self.uid = pack:readU32()
	return self
end

return AckSceneMove
