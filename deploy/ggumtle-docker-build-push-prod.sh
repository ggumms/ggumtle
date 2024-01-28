#!/bin/bash 

export TAG=0.0.2
export REGISTRY=localhost:5000

docker build -t $REGISTRY/test-frontend:$TAG ../frontend
docker build -t $REGISTRY/test-backend:$TAG ../backend

docker push $REGISTRY/test-frontend:$TAG
docker push $REGISTRY/test-backend:$TAG

docker rmi $REGISTRY/test-frontend:$TAG
docker rmi $REGISTRY/test-backend:$TAG
