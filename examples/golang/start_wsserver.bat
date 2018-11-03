@ECHO off

SET GOPATH=%CD%

del bin\wsserver.exe
xcopy %CD%\..\..\data\data.code.golang.server\* src\wsserver\proto /y
go install wsserver
bin\wsserver.exe


PAUSE
