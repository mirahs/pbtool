package proto

const (
	// 发送聊天信息
	P_CHAT_SEND                    uint16 = 1510
	// 聊天信息返回
	P_CHAT_SEND_OK                 uint16 = 1520
	// GM命令
	P_CHAT_GM                      uint16 = 1530
	// 角色登录
	P_C_ROLE_LOGIN                 uint16 = 1010
	// 角色创建
	P_C_ROLE_CREATE                uint16 = 1020
	// 请求随机名字
	P_C_ROLE_RAND_NAME             uint16 = 1030
	// 随机名字返回
	P_S_ROLE_RAND_NAME_OK          uint16 = 1040
	// 登录成功
	P_S_ROLE_LOGIN_OK              uint16 = 1050
	// 登录成功(无角色)
	P_S_ROLE_LOGIN_OK_NO_ROLE      uint16 = 1060
	// 请求进入场景(飞)
	P_C_SCENE_ENTER_FLY            uint16 = 2010
	// 请求进入场景
	P_C_SCENE_ENTER                uint16 = 2020
	// 行走数据
	P_C_SCENE_MOVE                 uint16 = 2030
	// 进入场景成功
	P_S_SCENE_ENTER                uint16 = 2040
	// 场景玩家列表
	P_S_SCENE_PLAYERS              uint16 = 2050
	// 退出场景成功
	P_S_SCENE_EXIT                 uint16 = 2060
	// 请求玩家列表
	P_C_SCENE_REQ_PLAYERS          uint16 = 2070
	// 行走数据
	P_S_SCENE_MOVE                 uint16 = 2080
	// 玩家基础信息
	P_MSG_ROLE_BASE                uint16 = 0
	// 添加好友基础信息
	P_MSG_FRIEND_BASE_ADD          uint16 = 0
	// 场景玩家旋转和位置信息
	P_MSG_SCENE_ROT_POS            uint16 = 0
	// 场景玩家旋转和位置信息
	P_MSG_SCENE_PLAYER             uint16 = 0
	// 场景Vector3信息
	P_MSG_SCENE_VECTOR_3           uint16 = 0
	// 
	P_MSG_TEST_X_X                 uint16 = 0
	// 测试信息块
	P_MSG_TEST_SEND                uint16 = 0
	// 
	P_MSG_TEST_PHP                 uint16 = 0
	// 测试发送
	P_C_TEST_SEND                  uint16 = 40010
	// 测试返回
	P_S_TEST_SEND_OK               uint16 = 40020
	// 
	P_C_TEST_X_X                   uint16 = 40040
	// 
	P_S_TEST_X_X                   uint16 = 40050
	// 
	P_C_TEST_PHP                   uint16 = 40060
	// 
	P_S_TEST_PHP_OK                uint16 = 40070
	// 
	P_C_TEST_JS                    uint16 = 40080
	// 
	P_S_TEST_JS_OK                 uint16 = 40090
)
