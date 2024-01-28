#!/bin/bash

cd ../frontend && rm -rf build && npm install && npm audit fix && npm run build
