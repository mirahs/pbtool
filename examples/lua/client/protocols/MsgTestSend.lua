module("MsgTestSend", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = MsgTestSend})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.id_u8 = 0
	self.role_base = nil
	self.id_f32 = {}
	self.id_op_u8 = 0
	self.op_role_base = nil
end


function encode(self)
	 local pack = packet.new()
	pack:writeU8(self.id_u8)
	pack:writeBytes(self.role_base:getBytes())
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
	if self.op_role_base ~= nil then
	pack:writeU8(1)
		pack:writeBytes(self.op_role_base:getBytes())
	else
		pack:writeU8(0)
	end
	return pack:readBytes()
end

function decode(self, pack)
	self.id_u8 = pack:readU8()
	self.role_base = MsgRoleBase.new():decode(pack)
	id_f32_count = pack:readU16()
	for i = 1, id_f32_count do
		table.insert(self.id_f32, pack:readF32())
	end
	 local id_op_u8_flag = pack:readU8()
	if id_op_u8_flag then
		self.id_op_u8 = pack:readU8()
	end
	 local op_role_base_flag = pack:readU8()
	if op_role_base_flag then
		self.op_role_base = MsgRoleBase.new():decode(pack)
	end
	return self
end

function getBytes(self)
	return self:encode()
end
