@ECHO off

del client.exe
xcopy %CD%\..\..\data\data.code.golang.client\* client\proto /y
cd client
go build client
client.exe

PAUSE
