#!/bin/bash

cd ../frontend && rm -rf dist && rm -rf package-lock.json && npm install && npm run build
