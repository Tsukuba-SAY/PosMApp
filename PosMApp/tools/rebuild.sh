#!/usr/bin/bash

cd /PosMAppBuild
pwd
git pull
#git status
git branch --contains
httpd -k restart
echo "httpd restarted"
echo "rebuild done!"
exit 0