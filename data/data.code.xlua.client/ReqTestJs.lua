ReqTestJs = {}
setmetatable(ReqTestJs, {__index = _G})
local _ENV = ReqTestJs


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = ReqTestJs})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.u64 = 0
	self.i64 = 0
end


function encode(self)
	pack = packet.new()
	pack:writeu64(self.u64)
	pack:writei64(self.i64)
	return pack:encode(Msg.P_REQ_TEST_JS)
end


function setU64(self, u64)
	self.u64 = u64
end

function setI64(self, i64)
	self.i64 = i64
end

