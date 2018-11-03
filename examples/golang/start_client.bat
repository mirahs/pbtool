@ECHO off

SET GOPATH=%CD%

del bin\client.exe
xcopy %CD%\..\..\data\data.code.golang.client\* src\client\proto /y
go install client
bin\client.exe


PAUSE
