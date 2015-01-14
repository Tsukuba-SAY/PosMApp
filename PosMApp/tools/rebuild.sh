#!/usr/bin/bash

sudo cd /PosMAppBuild
sudo pwd
sudo git pull
#git status
sudo git branch --contains
sudo httpd -k restart
sudo echo "httpd restarted"
sudo echo "rebuild done!"
exit 0