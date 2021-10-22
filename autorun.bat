@echo off
title Triumph & Tragedy I
echo [Triumph & Tragedy I] is starting ..
:main
node main.js
timeout /t 30
echo [Triumph & Tragedy I] crashed! Restarting ..
goto main
