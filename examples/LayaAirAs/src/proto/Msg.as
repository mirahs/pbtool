package proto {
	public class Msg {
		/**聊天信息返回*/
		public static const ACK_CHAT_SEND_OK:uint                   = 1520;

		/**随机名字返回*/
		public static const ACK_ROLE_RAND_NAME_OK:uint              = 1040;

		/**登录成功*/
		public static const ACK_ROLE_LOGIN_OK:uint                  = 1050;

		/**登录成功(无角色)*/
		public static const ACK_ROLE_LOGIN_OK_NO_ROLE:uint          = 1060;

		/**进入场景成功*/
		public static const ACK_SCENE_ENTER:uint                    = 2040;

		/**场景玩家列表*/
		public static const ACK_SCENE_PLAYERS:uint                  = 2050;

		/**退出场景成功*/
		public static const ACK_SCENE_EXIT:uint                     = 2060;

		/**行走数据*/
		public static const ACK_SCENE_MOVE:uint                     = 2080;

		/**测试返回*/
		public static const ACK_TEST_SEND_OK:uint                   = 40020;

		/***/
		public static const ACK_TEST_X_X:uint                       = 40050;

		/***/
		public static const ACK_TEST_PHP_OK:uint                    = 40070;

		/***/
		public static const ACK_TEST_JS_OK:uint                     = 40090;
	}
}
