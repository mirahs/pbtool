#!/bin/bash
export PATH=/d/apps/erl10.1/bin:${PATH}


mkdir -p ebin

\cp ../../../data/data.code.erlang.common.server/const.pb.hrl include/
\cp ../../../data/data.code.erlang.server/* src/mod_pb/

erl -noshell -s make all -s init stop

#erl -pa ebin -s server
werl -pa ebin -s server &
