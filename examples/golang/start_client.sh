#!/bin/bash
\cp ./../../data/data.code.golang.client/* ./client/proto
cd client
go build client
./client
