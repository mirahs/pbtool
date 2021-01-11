#!/bin/bash
rm -f ./wsserver/server
\cp ../../data/golang/* ./wsserver/proto/
cd wsserver/
go build server
./server
