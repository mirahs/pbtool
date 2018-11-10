#!/bin/bash
export PATH=/d/apps/erl10.1/bin:${PATH}


mkdir -p ebin

\cp ../../../data/data.code.erlang.common.client.old/const.pb.hrl include/
\cp ../../../data/data.code.erlang.common.client.old/record.pb.hrl include/
\cp ../../../data/data.code.erlang.client.old/pb.erl src/

erl -noshell -s make all -s init stop

#erl -pa ebin -s client
werl -pa ebin -s client &
