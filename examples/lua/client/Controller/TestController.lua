module("TestController", package.seeall)


local instance = nil

function getInstance()
	if not instance then
		instance = TestController.new()
	end
	return instance
end

function new()
	local obj = {}
	setmetatable(obj, {__index = TestController})
	obj:init()
	return obj
end

function init(self)
	self.name = "TestController"

	self:addSocketEvent()
end

function addSocketEvent(self)
	g_net:add_event_listener(Msg.P_ACK_TEST_X_X, onAckTestXX, self)
	g_net:add_event_listener(Msg.P_ACK_TEST_SEND_OK, onAckTestSendOk, self)
	g_net:add_event_listener(Msg.P_ACK_TEST_JS_OK, onAckTestJsOk, self)
end


function onAckTestXX(self, pack)
	local ackTestXX = AckTestXX.new():decode(pack)

	print("ackTestXX.id_u8: ", ackTestXX.id_u8)
	print("ackTestXX.id_u16: ", ackTestXX.id_u16)
	print("ackTestXX.id_u32: ", ackTestXX.id_u32)
	print("ackTestXX.optional_id_u8: ", ackTestXX.optional_id_u8)
end

function onAckTestSendOk(self, pack)
	local ackTestSendOk = AckTestSendOk.new():decode(pack)

	print("ackTestSendOk:getRoleBase():getUid(): " .. ackTestSendOk.role_base.uid)
	print("ackTestSendOk:getRoleBase():getUname(): " .. ackTestSendOk.role_base.uname)
	print("ackTestSendOk:getOpRoleBase():getUname(): " .. ackTestSendOk.op_role_base.uname)
	print("ackTestSendOk:getOpRoleBase():getUid(): " .. ackTestSendOk.op_role_base.uid)
end

function onAckTestJsOk(self, pack)
	local ackTestJsOk = AckTestJsOk.new():decode(pack)

	print("ackTestJsOk.u64:" .. ackTestJsOk.u64)
	print("ackTestJsOk.i64:" .. ackTestJsOk.i64)
end
