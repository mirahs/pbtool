@ECHO off

del wsserver\server.exe
xcopy %CD%\..\..\data\golang\* wsserver\pb\ /y
cd wsserver\
go build server
server.exe

PAUSE
