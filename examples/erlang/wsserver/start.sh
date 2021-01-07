#!/bin/bash
\cp ../../../data/erlang/* src/pb/
\cp ../../../data/erlang.common/* include/

./rebar g-d
./rebar co

if [ ${MSYSTEM} ]
then
	werl -pa ebin deps/*/ebin -s game start &
else
	erl -pa ebin deps/*/ebin -s game start
fi
