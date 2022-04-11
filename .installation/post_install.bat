@echo off
title Triumph ^& Tragedy Installation Wizard

:: Initialise global variables
set "error=[31m[ERROR][0m"
set "logo=[36m[Triumph ^& Tragedy][0m"
set "info=[36m[INFO][0m"
set "warn=[33m[WARN][0m"

:: Begin installing npm dependencies
cd ..

echo %info% %logo% Installing dependencies (1/11) 'underscore' ..
call npm install underscore
echo %info% %logo% Installing dependencies (2/11) 'ngraph.graph' ..
call npm install ngraph.graph
echo %info% %logo% Installing dependencies (3/11) 'ngraph.path' ..
call npm install ngraph.path
echo %info% %logo% Installing dependencies (4/11) 'canvas' ..
call npm install canvas
echo %info% %logo% Installing dependencies (5/11) 'diacriticless' ..
call npm install diacriticless
echo %info% %logo% Installing dependencies (6/11) 'discord.js' ..
call npm install discord.js
echo %info% %logo% Installing dependencies (7/11) 'fs' ..
call npm install fs
echo %info% %logo% Installing dependencies (8/11) 'node-html-parser' ..
call npm install node-html-parser
echo %info% %logo% Installing dependencies (9/11) 'opusscript' ..
call npm install opusscript
echo %info% %logo% Installing dependencies (10/11) 'path' ..
call npm install path
echo %info% %logo% Installing dependencies (11/11) '@discordjs/voice' ..
call npm install @discordjs/voice

echo %info% %logo% All dependencies successfully installed, patching issues ..
call npm install
call npm audit fix

echo %info% %logo% Installing Cairo Graphics ..
echo %warn% %logo% This will modify your System's PATH variable. 
echo A backup will automatically be saved in path.txt just in case. Are you sure you wish to continue^? (Y/N)

:: Confirmation prompt for Cairo Graphics install
choice /N /M "Enter input:"

if errorlevel 2 GOTO step_four
if errorlevel 1 GOTO step_three

:step_three
cd .installation
path_backup.bat>PATH.txt
cd ..
setx path "%PATH%;%CD%\.installation\cairo\bin"

echo %info% %logo% Cairo Graphics successfully installed.

:step_four

echo %info% %logo% requires that you have already have an existing bot token to insert when prompted. If you don't have a bot token, please follow the instructions below:
echo.
echo 1. Go to Discord Developer Portal ([36m[4mhttps://discord.com/developers/applications[0m) and make sure you are logged in with your Discord account.
echo 2. Click on 'New Application', give it a name, and click 'Create'.
echo 3. Click on 'Bot' on the leftmost side of the screen.
echo 4. Click on 'Add Bot', and confirm (Click on 'Yes, do it!')
echo 5. Click on 'Reset Token'.
echo 6. Click on 'Copy'.
echo You should now have a freshly minted bot token. Please insert it below:

:: WIP - Copy and modify ./installation/settings.js

pause