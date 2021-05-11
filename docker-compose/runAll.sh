docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker rmi pro:latest gro:latest rece:latest ing:latest
docker volume rm $(docker volume ls)

docker build -t pro:latest test-data/profileSQL/
docker build -t gro:latest test-data/GroupSQL/



