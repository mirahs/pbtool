@ECHO off

del wsserver\server.exe
xcopy %CD%\..\..\data\golang\* wsserver\proto\ /y
cd wsserver\
go build server
server.exe

PAUSE
