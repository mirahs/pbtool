#!/bin/bash
export PATH=/d/apps/erl10.1/bin:${PATH}


mkdir -p ebin

\cp ../../../data/data.code.erlang.common.client/const.pb.hrl include/
\cp ../../../data/data.code.erlang.client/* src/mod_pb/

erl -noshell -s make all -s init stop

#erl -pa ebin -s client
werl -pa ebin -s client &
