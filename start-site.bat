@echo off
title Aureum website - local server
cd /d "%~dp0"
where node >/dev/null 2>nul
if errorlevel 1 (
  echo.
  echo Node.js is not installed on this computer.
  echo Install the LTS version from https://nodejs.org, then double-click this file again.
  echo.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing packages - first run only, this takes a few minutes...
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed. Copy the error above and send it to Claude.
    pause
    exit /b 1
  )
)
echo.
echo Starting the site. Open http://localhost:3000 - keep this window open while you use it.
echo.
call npm run dev
pause
