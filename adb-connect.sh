#!/bin/bash

IP=${1:?IP (param#1) is undefined!}
PORT=${2:-5555}
ADB_DIR=./misc/platform-tools

echo // Parameter
echo IP = $IP
echo PORT = $PORT
echo ADB_DIR = $ADB_DIR
echo

$ADB_DIR/adb tcpip $PORT
$ADB_DIR/adb connect $IP:$PORT
$ADB_DIR/adb devices

exit 0
