#!/usr/bin/bash

cd /PosMApp/
git pull
httpd -k stop
httpd -k start