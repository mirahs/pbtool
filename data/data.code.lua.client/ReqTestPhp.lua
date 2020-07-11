module("ReqTestPhp", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = ReqTestPhp})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.u64 = 0
	self.strxx = ""
	self.msg_req = nil
	self.msg_opt = nil
	self.msg_rep = {}
end


function encode(self)
	local pack = packet.new()
	pack:writeU64(self.u64)
	pack:writeString(self.strxx)
	pack:writeBytes(self.msg_req:getBytes())
	if self.msg_opt ~= nil then
		pack:writeU8(1)
		pack:writeBytes(self.msg_opt:getBytes())
	else
		pack:writeU8(0)
	end
	local msg_rep_count = table.getn(self.msg_rep)
	pack:writeU16(msg_rep_count)
	for i = 1, msg_rep_count do
		pack:writeBytes(table.remove(self.msg_rep):getBytes())
	end
	return pack:encode(Msg.P_REQ_TEST_PHP)
end

return ReqTestPhp
