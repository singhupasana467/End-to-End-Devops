@echo off
set REACT_APP_BACKEND_URL=http://backend-service:3500/api/tasks

echo REACT_APP_BACKEND_URL=%REACT_APP_BACKEND_URL% > .env

echo ✅ .env file created with:
type .env
