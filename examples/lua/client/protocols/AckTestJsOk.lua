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
	self.u32s = {}
	self.xx = 0
	self.idf32 = 0
	self.idf64 = 0
	self.role = nil
	self.roles = {}
end


function decode(self, pack)
	self.u64 = pack:readU32()
	self.i64 = pack:readI32()
	u32s_count = pack:readU16()
	for i = 1, u32s_count do
		table.insert(self.u32s, pack:readU32())
	end
	self.xx = pack:readString()
	self.idf32 = pack:readF32()
	self.idf64 = pack:readF64()
	self.role = MsgRoleBase.new():decode(pack)
	roles_count = pack:readU16()
	for i = 1, roles_count do
		table.insert(self.roles, MsgRoleBase.new():decode(pack))
	end
	return self
end
