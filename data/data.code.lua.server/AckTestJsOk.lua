module("AckTestJsOk", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = AckTestJsOk})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.u64 = 0
	self.i64 = 0
end


function encode(self)
	local pack = packet.new()
	pack:writeU64(self.u64)
	pack:writeI64(self.i64)
	return pack:encode(Msg.P_ACK_TEST_JS_OK)
end
