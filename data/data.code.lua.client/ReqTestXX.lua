module("ReqTestXX", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = ReqTestXX})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.id_u8 = 0
	self.id_u16 = 0
	self.id_u32 = 0
	self.repeat_id_u8 = {}
	self.optional_id_u8 = 0
end


function encode(self)
	local pack = packet.new()
	pack:writeU8(self.id_u8)
	pack:writeU16(self.id_u16)
	pack:writeU32(self.id_u32)
	local repeat_id_u8_count = table.getn(self.repeat_id_u8)
	pack:writeU16(repeat_id_u8_count)
	for i = 1, repeat_id_u8_count do
		pack:writeU8(table.remove(self.repeat_id_u8))
	end
	if self.optional_id_u8 ~= 0 then
		pack:writeU8(1)
		pack:writeU8(self.optional_id_u8)
	else
		pack:writeU8(0)
	end
	return pack:encode(Msg.P_REQ_TEST_X_X)
end

return ReqTestXX
