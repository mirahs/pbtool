@ECHO off

del server\server.exe
xcopy %CD%\..\..\data\golang\* server\proto\ /y
cd server\
go build server
server.exe

PAUSE
