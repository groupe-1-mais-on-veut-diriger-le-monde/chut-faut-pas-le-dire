#!/bin/bash


# build les images a partir du dockerfile
sudo docker image build -t service_film_build -f ../services/test_film/Dockerfile .



# change les noms des images et les envoies au docker hub
sudo docker tag service_film_build edin0/service_film_build:latest


# connection au docker hub
#sudo echo ${DockerPassword} | docker login --username ${DockerUsername} --password-stdin


#sudo docker login --username edin0 --password-stdin

#sudo docker login --username=edin0 --email=edin.sljmn@gmail.com 

#sudo docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"

#sudo docker login -u=$DOCKER_USER -p=$DOCKER_PASSWORD

# push images tagged
sudo docker push edin0/service_film_build:latest

# test the build

sudo docker run -p 8080:8080 -d edin0/service_film_build

#check website

sudo curl localhost:8080