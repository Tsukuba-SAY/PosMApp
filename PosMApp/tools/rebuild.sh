#!/usr/bin/bash

cd /PosMAppBuild
#pwd
git branch --contains
git pull
#git status
#httpd -k restart
echo "rebuild done!"
exit 0
