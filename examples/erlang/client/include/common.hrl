-define(HOST,   "127.0.0.1").
-define(PORT,   8888).


%% 调试
-define(PRINT(Format, Args),io:format("PRINT ~p:~p " ++ Format ++ "~n",	[?MODULE, ?LINE | Args])).
-define(PRINT(Format),		io:format("PRINT ~p:~p " ++ Format ++ "~n",	[?MODULE, ?LINE])).
