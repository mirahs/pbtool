-module(game_app).

-behaviour(application).

%% API.
-export([start/2]).
-export([stop/1]).

-include("common.hrl").


%% API.
start(_Type, _Args) ->
	Dispatch = cowboy_router:compile([
		{'_', [
			{"/websocket", ws_handler, []}
		]}
	]),
	{ok, _} = cowboy:start_clear(http, [{port, ?PORT}], #{
		env => #{dispatch => Dispatch}
	}),
	game_sup:start_link().

stop(_State) ->
	ok.
