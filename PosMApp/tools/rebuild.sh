#!/usr/bin/bash

/usr/bin/cd /PosMAppBuild
/usr/bin/pwd
/usr/bin/git pull
#git status
/usr/bin/git branch --contains
/usr/sbin/httpd -k restart
/usr/bin/echo "httpd restarted"
/usr/bin/echo "rebuild done!"
exit 0