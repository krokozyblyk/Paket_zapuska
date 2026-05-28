@echo off
cd /d "%~dp0"

echo Starting Prizma with PostgreSQL...
start "Server" cmd /k "cd server && node index.js"
timeout /t 5
start "Client" cmd /k "cd client && npm run dev"
pause