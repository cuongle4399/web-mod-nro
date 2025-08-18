@echo off
setlocal enabledelayedexpansion

REM ---- Đọc nội dung file ----
set "file=Update Mod Nro\checkVersionNro.txt"
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

echo -------------------------------------------------
echo Commit message: %commitMsg%
echo -------------------------------------------------

REM ---- Thực hiện git ----
git add . || (echo ❌ Git add lỗi! & pause & exit /b)

git commit -m "%commitMsg%" && (
    git push origin master && (
        echo ✅ Commit & Push thành công!
    ) || (
        echo ❌ Push thất bại!
    )
) || (
    echo ⚠️ Không có thay đổi để commit!
)

pause
endlocal
