@ECHO off

SET GOPATH=%CD%

del bin\server.exe
xcopy %CD%\..\..\data\data.code.golang.server\* src\server\proto /y
go install server
bin\server.exe


PAUSE
