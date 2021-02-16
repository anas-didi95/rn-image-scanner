#!/bin/bash

ADB_DIR=./misc/platform-tools

echo // Parameter
echo ADB_DIR = ${ADB_DIR}
echo

$ADB_DIR/adb devices

exit 0
