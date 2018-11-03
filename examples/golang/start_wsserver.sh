#!/bin/bash
export GOPATH=$(dirname $(readlink -f ${0}))


\cp ${GOPATH}/../../data/data.code.golang.server/* ./src/wsserver/proto
go install wsserver
./bin/wsserver
