#!/bin/bash
 rm -rf ./build/* && ./node_modules/.bin/fis3 release -r ./src -d ./build $@
 echo "hotfix-0.1"