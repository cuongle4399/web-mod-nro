@echo off
setlocal enabledelayedexpansion

REM ---- Đọc nội dung file ----
set "file=Mod Nro\checkVersionNro.txt"
set "fileContent="

if exist "%file%" (
    for /f "usebackq delims=" %%a in ("%file%") do (
        set "fileContent=%%a"
        goto :doneRead
    )
)

:doneRead
if "%fileContent%"=="" set "fileContent=NoVersion"

REM ---- Lấy ngày giờ hiện tại ----
for /f "tokens=1-4 delims=/ " %%a in ('date /t') do (
    set dd=%%a
    set mm=%%b
    set yyyy=%%c
)
for /f "tokens=1-2 delims=: " %%a in ('time /t') do (
    set hh=%%a
    set min=%%b
)

REM ---- Tạo commit message ----
set commitMsg=Update %fileContent% on %yyyy%-%mm%-%dd% %hh%:%min%

echo Commit message: %commitMsg%

REM ---- Thực hiện git ----
git add .
git commit -m "%commitMsg%"
git push origin master

endlocal
