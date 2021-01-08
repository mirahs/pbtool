@ECHO off

del client\client.exe
xcopy %CD%\..\..\data\golang\* client\proto\ /y
cd client\
go build client
client.exe

PAUSE
