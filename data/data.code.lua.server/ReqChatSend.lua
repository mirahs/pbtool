module("ReqChatSend", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = ReqChatSend})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.channel = 0
	self.dest_uid = 0
	self.content = ""
end


function decode(self, pack)
	self.channel = pack:readU8()
	self.dest_uid = pack:readU32()
	self.content = pack:readString()
	return self
end
