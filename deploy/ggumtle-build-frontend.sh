#!/bin/bash

cd ../frontend && rm -rf dist && rm -rf node_modules && rm -rf package-lock.json && chmod -R 755 . && cp $SECRETS_FILE . && ls -al && npm install && npm run build
