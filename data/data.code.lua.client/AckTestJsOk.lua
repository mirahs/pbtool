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


function decode(self, pack)
	self.u64 = pack:readU64()
	self.i64 = pack:readI64()
	return self
end

return AckTestJsOk
