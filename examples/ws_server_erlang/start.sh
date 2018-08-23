#!/bin/bash
\cp ../../data/data.code.erlang.common.server/const.pb.hrl include/
\cp ../../data/data.code.erlang.common.server/record.pb.hrl include/

\cp ../../data/data.code.erlang.server/pb.erl src/mod_pb/


./rebar g-d
./rebar co


werl -pa ebin deps/*/ebin -s game start &
