#!/bin/bash 

export TAG=0.0.1
export REGISTRY=localhost:5000

docker build -t $REGISTRY/ggumtle-frontend:$TAG ../frontend
docker build -t $REGISTRY/ggumtle-backend:$TAG ../backend

docker push $REGISTRY/ggumtle-frontend:$TAG
docker push $REGISTRY/ggumtle-backend:$TAG

docker rmi $REGISTRY/ggumtle-frontend:$TAG
docker rmi $REGISTRY/ggumtle-backend:$TAG
