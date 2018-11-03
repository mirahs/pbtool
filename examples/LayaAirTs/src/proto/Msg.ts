namespace proto {
	export const enum Msg {
		/**聊天信息返回*/
		ACK_CHAT_SEND_OK              = 1520,

		/**随机名字返回*/
		ACK_ROLE_RAND_NAME_OK         = 1040,

		/**登录成功*/
		ACK_ROLE_LOGIN_OK             = 1050,

		/**登录成功(无角色)*/
		ACK_ROLE_LOGIN_OK_NO_ROLE     = 1060,

		/**进入场景成功*/
		ACK_SCENE_ENTER               = 2040,

		/**场景玩家列表*/
		ACK_SCENE_PLAYERS             = 2050,

		/**退出场景成功*/
		ACK_SCENE_EXIT                = 2060,

		/**行走数据*/
		ACK_SCENE_MOVE                = 2080,

		/**测试返回*/
		ACK_TEST_SEND_OK              = 40020,

		/***/
		ACK_TEST_X_X                  = 40050,

		/***/
		ACK_TEST_PHP_OK               = 40070,

		/***/
		ACK_TEST_JS_OK                = 40090,
	}
}
