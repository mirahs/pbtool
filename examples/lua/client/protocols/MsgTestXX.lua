module("MsgTestXX", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = MsgTestXX})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.id_u8 = 0
	self.id_f32 = {}
	self.id_op_u8 = 0
end


function encode(self)
	 local pack = packet.new()
	pack:writeU8(self.id_u8)
	id_f32_count = table.getn(self.id_f32)
	pack:writeU16(id_f32_count)
	for i = 1, id_f32_count do
		pack:writeF32(table.remove(self.id_f32))
	end
	if self.id_op_u8 ~= 0 then
	pack:writeU8(1)
		pack:writeU8(self.id_op_u8)
	else
		pack:writeU8(0)
	end
	return pack:readBytes()
end

function decode(self, pack)
	self.id_u8 = pack:readU8()
	id_f32_count = pack:readU16()
	for i = 1, id_f32_count do
		table.insert(self.id_f32, pack:readF32())
	end
	 local id_op_u8_flag = pack:readU8()
	if id_op_u8_flag then
		self.id_op_u8 = pack:readU8()
	end
	return self
end

function getBytes(self)
	return self:encode()
end
