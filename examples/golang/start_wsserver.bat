@ECHO off

del server.exe
xcopy %CD%\..\..\data\data.code.golang.server\* wsserver\proto /y
cd wsserver
go build server
server.exe

PAUSE
