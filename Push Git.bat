@echo off
setlocal enabledelayedexpansion

REM --- Đường dẫn file version ---
set "VERSION_FILE=Update Mod Nro\checkVersionNro.txt"

REM --- Kiểm tra file tồn tại ---
if not exist "%VERSION_FILE%" (
    echo ❌ File %VERSION_FILE% không tồn tại!
    pause
    exit /b
)

REM --- Đọc nội dung file ---
set "VERSION_CONTENT="
for /f "usebackq delims=" %%a in ("%VERSION_FILE%") do (
    set "VERSION_CONTENT=%%a"
)

REM --- Lấy thời gian hiện tại ---
for /f "tokens=1-4 delims=/ " %%a in ("%date%") do (
    set "TODAY=%%a-%%b-%%c"
)
set "NOW=%time:~0,8%"

REM --- Thực hiện Git ---
echo 🔄 Đang add thay đổi...
git add .

echo 🔄 Đang commit...
git commit -m "Update %VERSION_CONTENT% - %TODAY% %NOW%"

echo 🔄 Đang push lên origin master...
git push origin master

echo ✅ Commit & Push thành công!
pause
exit /b
