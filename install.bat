@echo off
title Triumph ^& Tragedy Installation Wizard
echo Installation wizard starting ..
echo This installation wizard will take you through the setup process for Triumph ^& Tragedy.
echo.
echo This installation program was created on Windows 10/11 and may not be compatible on some devices. 
echo Check our [36m[4mInstallation Guide[0m (https://github.com/Australis-0/TriumphAndTragedy) for more information.
echo.

:: Initialise global variables
set "error=[31m[0m"
set "logo=[36m[Triumph ^& Tragedy][0m"
set "warn=[33m[WARN][0m"

:: Check if Node.js is already installed
set "node_warning=%warn% Node is not installed on your device. Would you like to install it? (Y/N)"
set "node_install=false"
for /f "delims=" %%i in ('node -v 2^>nul') do (
	set "node_install=true"
	set "node_warning=You already have Node %%i installed on your device. %logo% requires Node.js v16.9.0+. Would you like to update Node.js? (Y/N)"
)

echo %node_warning%

:failed_node_confirmation
choice /N /M "Enter input:"

:: 1 is Y, 2 is N - MUST BE IN THIS ORDER!
if errorlevel 2 GOTO node_no_install
if errorlevel 1 GOTO node_install

:node_no_install
echo You have decided not to install Node.js.
goto step_two

:node_install
echo.
echo Opening Node.js installer ..
cd .installation
node-v16.14.2-x64.msi
cd ..
goto step_two

:step_two

pause
