#!/bin/bash


# build les images a partir du dockerfile
sudo docker image build -t service_film_build -f ../services/test_film/Dockerfile .

# connection au docker hub
sudo echo ${DockerPassword} | docker login --username ${DockerUsername} --password-stdin

Sudo docker login -u edin0

# change les noms des images et les envoies au docker hub
sudo docker tag service_film_build edin0/service_film_build:latest

sudo docker push edin0/service_film_build:latest

# test the build

sudo docker run -p 8080:8080 -d edin0/service_film_build

#check website

sudo curl localhost:8080