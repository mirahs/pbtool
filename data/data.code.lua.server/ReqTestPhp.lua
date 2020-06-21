module("ReqTestPhp", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = ReqTestPhp})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.u64 = 0
	self.strxx = 0
	self.msg_req = nil
	self.msg_opt = nil
	self.msg_rep = {}
end


function decode(self, pack)
	self.u64 = pack:readU64()
	self.strxx = pack:readString()
	self.msg_req = MsgTestPhp.new():decode(pack)
	 local msg_opt_flag = pack:readU8()
	if msg_opt_flag then
		self.msg_opt = MsgTestPhp.new():decode(pack)
	end
	local msg_rep_count = pack:readU16()
	for i = 1, msg_rep_count do
		table.insert(self.msg_rep, MsgTestPhp.new():decode(pack))
	end
	return self
end
