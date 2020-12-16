@ECHO off

xcopy %CD%\..\..\data\data.code.golang.server\* server\proto /y
cd server
go build server
server.exe

PAUSE
