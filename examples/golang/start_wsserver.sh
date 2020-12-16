#!/bin/bash
\cp ./../../data/data.code.golang.server/* ./wsserver/proto
cd wsserver
go build server
./server
