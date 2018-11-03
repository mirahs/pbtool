#!/bin/bash
export GOPATH=$(dirname $(readlink -f ${0}))


\cp ${GOPATH}/../../data/data.code.golang.server/* ./src/server/proto
go install server
./bin/server
