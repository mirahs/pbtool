#!/bin/bash
rm -f ./wsserver/server
\cp ./../../data/data.code.golang.server/* ./wsserver/proto
cd wsserver
go build server
./server
