#!/bin/bash
rm -f ./client/client
\cp ./../../data/data.code.golang.client/* ./client/proto
cd client
go build client
./client
