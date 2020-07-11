module("AckChatSendOk", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = AckChatSendOk})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.channel = 0
	self.uid = 0
	self.uname = ""
	self.content = ""
end


function encode(self)
	local pack = packet.new()
	pack:writeU8(self.channel)
	pack:writeU32(self.uid)
	pack:writeString(self.uname)
	pack:writeString(self.content)
	return pack:encode(Msg.P_ACK_CHAT_SEND_OK)
end
