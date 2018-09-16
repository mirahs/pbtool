#!/bin/bash
export PATH=/d/apps/erl10.0.1/bin:${PATH}


\cp ../../data/data.code.erlang.common.server/const.pb.hrl include/

\cp ../../data/data.code.erlang.server/* src/mod_pb/


./rebar g-d
./rebar co


werl -pa ebin deps/*/ebin -s game start &
