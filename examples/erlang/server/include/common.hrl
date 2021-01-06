-define(TCP_OPTIONS,	[
	binary
	,{packet, 0}
	,{active, true}
	,{reuseaddr, true}
	,{nodelay, false}
	,{delay_send, true}
	,{exit_on_close, false}
	,{send_timeout, 10000}
	,{send_timeout_close, false}
]).

-define(LISTEN_PORT, 8888).


%% 调试
-define(PRINT(Format, Args),io:format("PRINT ~p:~p " ++ Format ++ "~n",	[?MODULE, ?LINE | Args])).
-define(PRINT(Format),		io:format("PRINT ~p:~p " ++ Format ++ "~n",	[?MODULE, ?LINE])).
