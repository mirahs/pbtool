module("ReqChatGm", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = ReqChatGm})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.content = 0
end


function decode(self, pack)
	self.content = pack:readString()
	return self
end
