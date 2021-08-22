@ECHO off

del client\client.exe
xcopy %CD%\..\..\data\golang\* client\pb\ /y
cd client\
go build client
client.exe

PAUSE
