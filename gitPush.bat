@echo off
setlocal enabledelayedexpansion

REM === Config ===
set REPO_DIR=C:\Users\Cuong Le\Desktop\web mod game
set BRANCH=master

cd /d "%REPO_DIR%"

REM Hỏi message commit
set /p MSG="Nhap commit message: "

echo.
echo === Adding files ===
git add .

echo.
echo === Commit ===
git commit -m "%MSG%"

echo.
echo === Push len GitHub ===
git push origin %BRANCH%

echo.
echo Done!
pause
