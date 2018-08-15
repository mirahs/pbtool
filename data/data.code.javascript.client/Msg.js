module.exports = Object.freeze({
	//发送聊天信息
	REQ_CHAT_SEND                 : 1510,

	//聊天信息返回
	ACK_CHAT_SEND_OK              : 1520,

	//GM命令
	REQ_CHAT_GM                   : 1530,

	//角色登录
	REQ_ROLE_LOGIN                : 1010,

	//角色创建
	REQ_ROLE_CREATE               : 1020,

	//请求随机名字
	REQ_ROLE_RAND_NAME            : 1030,

	//随机名字返回
	ACK_ROLE_RAND_NAME_OK         : 1040,

	//登录成功
	ACK_ROLE_LOGIN_OK             : 1050,

	//登录成功(无角色)
	ACK_ROLE_LOGIN_OK_NO_ROLE     : 1060,

	//请求进入场景(飞)
	REQ_SCENE_ENTER_FLY           : 2010,

	//请求进入场景
	REQ_SCENE_ENTER               : 2020,

	//行走数据
	REQ_SCENE_MOVE                : 2030,

	//进入场景成功
	ACK_SCENE_ENTER               : 2040,

	//场景玩家列表
	ACK_SCENE_PLAYERS             : 2050,

	//退出场景成功
	ACK_SCENE_EXIT                : 2060,

	//请求玩家列表
	REQ_SCENE_REQ_PLAYERS         : 2070,

	//行走数据
	ACK_SCENE_MOVE                : 2080,

	//测试发送
	REQ_TEST_SEND                 : 40010,

	//测试返回
	ACK_TEST_SEND_OK              : 40020,

	//
	REQ_TEST_X_X                  : 40040,

	//
	ACK_TEST_X_X                  : 40050,

	//
	REQ_TEST_PHP                  : 40060,

	//
	ACK_TEST_PHP_OK               : 40070,
});
