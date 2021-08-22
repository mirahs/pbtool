#!/bin/bash
rm -f ./client/client
\cp ../../data/golang/* ./client/pb/
cd client/
go build client
./client
