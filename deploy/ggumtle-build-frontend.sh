#!/bin/bash

cd ../frontend && rm -rf dist && rm -rf node_modules && rm -rf package-lock.json && npm install && npm run build
