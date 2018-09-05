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


function decode(self, pack)
	self.u64 = pack:readu64()
	self.i64 = pack:readi64()
	return self
end


function getU64(self)
	return self.u64
end

function getI64(self)
	return self.i64
end

