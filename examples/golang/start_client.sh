#!/bin/bash
rm -f ./client/client
\cp ../../data/golang/* ./client/proto/
cd client/
go build client
./client
