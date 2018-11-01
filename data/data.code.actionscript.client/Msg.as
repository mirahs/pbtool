package proto {
	public class Msg {
		/**聊天信息返回*/
		public static const ACK_CHAT_SEND_OK:Uint                   = 1520,

		/**随机名字返回*/
		public static const ACK_ROLE_RAND_NAME_OK:Uint              = 1040,

		/**登录成功*/
		public static const ACK_ROLE_LOGIN_OK:Uint                  = 1050,

		/**登录成功(无角色)*/
		public static const ACK_ROLE_LOGIN_OK_NO_ROLE:Uint          = 1060,

		/**进入场景成功*/
		public static const ACK_SCENE_ENTER:Uint                    = 2040,

		/**场景玩家列表*/
		public static const ACK_SCENE_PLAYERS:Uint                  = 2050,

		/**退出场景成功*/
		public static const ACK_SCENE_EXIT:Uint                     = 2060,

		/**行走数据*/
		public static const ACK_SCENE_MOVE:Uint                     = 2080,

		/**测试返回*/
		public static const ACK_TEST_SEND_OK:Uint                   = 40020,

		/***/
		public static const ACK_TEST_X_X:Uint                       = 40050,

		/***/
		public static const ACK_TEST_PHP_OK:Uint                    = 40070,

		/***/
		public static const ACK_TEST_JS_OK:Uint                     = 40090,
	}
}
