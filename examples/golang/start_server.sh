#!/bin/bash
rm -f ./server/server
\cp ../../data/golang/* ./server/pb/
cd server/
go build server
./server
