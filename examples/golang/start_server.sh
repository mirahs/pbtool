#!/bin/bash
rm -f ./server/server
\cp ./../../data/data.code.golang.server/* ./server/proto
cd server
go build server
./server
