#!/bin/bash
rm -f ./wsserver/server
\cp ../../data/golang/* ./wsserver/pb/
cd wsserver/
go build server
./server
