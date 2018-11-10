#!/bin/bash
export PATH=/d/apps/erl10.1/bin:${PATH}


mkdir -p ebin

\cp ../../../data/data.code.erlang.common.server.old/const.pb.hrl include/
\cp ../../../data/data.code.erlang.common.server.old/record.pb.hrl include/
\cp ../../../data/data.code.erlang.server.old/pb.erl src/

erl -noshell -s make all -s init stop

#erl -pa ebin -s server
werl -pa ebin -s server &
