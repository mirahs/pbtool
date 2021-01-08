#!/bin/bash
rm -f ./server/server
\cp ../../data/golang/* ./server/proto/
cd server/
go build server
./server
