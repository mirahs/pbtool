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


function encode(self)
	local pack = packet.new()
	pack:writeU8(self.channel)
	pack:writeU32(self.dest_uid)
	pack:writeString(self.content)
	return pack:encode(Msg.P_REQ_CHAT_SEND)
end

return ReqChatSend
