#!/bin/bash
export PATH=/d/apps/erl9.3/bin:${PATH}


\cp ../../../data/data.code.erlang.common.server/const.pb.hrl include/
\cp ../../../data/data.code.erlang.server/* src/mod_pb/

./rebar g-d
./rebar co

#erl -pa ebin deps/*/ebin -s game start
werl -pa ebin deps/*/ebin -s game start &
