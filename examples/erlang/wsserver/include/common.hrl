-define(PORT,	8888).


-define(DEBUG(Format),			logger:debug(Format, [], ?MODULE, ?LINE)).
-define(DEBUG(Format, Args),	logger:debug(Format, Args, ?MODULE, ?LINE)).
