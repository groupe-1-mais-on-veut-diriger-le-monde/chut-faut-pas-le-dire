#!/bin/bash

# build les images a orator du dockerfile
docker image build -t service_film_build -f services/test_film/Dockerfile .

# connection au docker hub
echo ${DockerPassword} | docker login --username ${DockerUsername} --password-stdin

# change les noms des images et les envoies au docker hub
docker tag service_film_build edin0/service_film_build:latest

docker push edin0/service_film_build:latest

# test the build

docker run -p 8080:8080 -d edin0/service_film_build

#check website

curl localhost:8080