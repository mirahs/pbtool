module("MsgRoleBase", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = MsgRoleBase})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.uid = 0
	self.uname = 0
end


function encode(self)
	 local pack = packet.new()
	pack:writeU32(self.uid)
	pack:writeString(self.uname)
	return pack:readBytes()
end

function decode(self, pack)
	self.uid = pack:readU32()
	self.uname = pack:readString()
	return self
end

function getBytes(self)
	return self:encode()
end
