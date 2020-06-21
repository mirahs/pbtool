require "lfs"
local dir		= lfs.currentdir()

local protocols = dir .. "/protocols/"
local path_old	= package.path
package.path 	= string.format("%s?.lua;%s", protocols, path_old)


require "protocols/Protocols"
require "protocols/Msg"

require "network/net"
require "network/packet"

require "controller/TestController"


function sendTestXX()
	reqTestXX = ReqTestXX.new()
	reqTestXX.id_u8 = 110
	reqTestXX.id_u16 = 111
	reqTestXX.id_u32  = 250250
	repU8Table = {}
	table.insert(repU8Table, 12)
	reqTestXX.repeat_id_u8 = repU8Table
	reqTestXX.option_id_u8 = 123

	g_net:send(reqTestXX:encode())
end

function sendTestSend()
	roleBase 	= MsgRoleBase.new()
	roleBase.uid = 110
	roleBase.uname  = "mirahsxx"

	idF32Table = {}
	table.insert(idF32Table, 12.34)

	reqTestSend = ReqTestSend.new()
	reqTestSend.id_u8 = 111
	reqTestSend.role_base = roleBase
	reqTestSend.id_f32 = idF32Table
	reqTestSend.id_op_u8 = 123
	reqTestSend.op_role_base = roleBase

	g_net:send(reqTestSend:encode())
end


g_net = net.new("127.0.0.1", 8888)
g_net:connect()

if g_net.client then
	print "connect to server success\n"

	-- 注册消息回调
	TestController:getInstance()

	sendTestXX()
	sendTestSend()
	
	-- 开始工作
	g_net:run()
end
