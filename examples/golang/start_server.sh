#!/bin/bash
\cp ./../../data/data.code.golang.server/* ./server/proto
cd server
go build server
./server
