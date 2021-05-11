#FROM node:7
# dockerfile pire invention de la planète : WORKDIR va changer le working directory de la machine virtuel. Donc COPY 1 2 : 
# 1 correspondra TOUJOURS au PATH du repository GIT, donc faire WORKDIR ne change pas le chemin du path 1, mais du 2 qui est la machine virutelle.................
# donc pour copier les html faut par exemple : COPY /web-ui/src/app /usr/share/nginx/html, très intuitif merci à tous
# WORKDIR pas besoin ici.

#debug websites : https://stackoverflow.com/questions/26504846/copy-directory-to-another-directory-using-add-command
#https://stackoverflow.com/questions/37782505/is-it-possible-to-show-the-workdir-when-building-a-docker-image
#https://stackoverflow.com/questions/20632258/change-directory-command-in-docker
#https://stackoverflow.com/questions/51066146/what-is-the-point-of-workdir-on-dockerfile
#https://stackoverflow.com/questions/58078964/docker-file-does-not-exist-on-ubuntu


FROM nginx:1.19-alpine
#RUN pwd
#RUN ls
#COPY . /chut-faut-pas-le-dire
#RUN pwd
#RUN ls
#WORKDIR /chut-faut-pas-le-dire
#RUN pwd
#RUN ls
#WORKDIR /chut-faut-pas-le-dire/web-ui
#RUN pwd
#RUN ls

#WORKDIR /chut-faut-pas-le-dire/web-ui/src/app
COPY /web-ui/src/app /usr/share/nginx/html
COPY /web-ui/nginx.default /etc/nginx/conf.d/default.conf
EXPOSE 80

#RUN mkdir /home/sampleTest && cd /home/sampleTest && git clone https://github.com/groupe-1-mais-on-veut-#diriger-le-monde/chut-faut-pas-le-dire.git


#WORKDIR /home/sampleTest/chut-faut-pas-le-dire/services/test_film/

#ENTRYPOINT ["node", "index.js"]
