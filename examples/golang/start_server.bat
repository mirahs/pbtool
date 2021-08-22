@ECHO off

del server\server.exe
xcopy %CD%\..\..\data\golang\* server\pb\ /y
cd server\
go build server
server.exe

PAUSE
