#FROM node:7
FROM nginx:1.19-alpine
RUN pwd
RUN ls
COPY . /chut-faut-pas-le-dire
RUN pwd
RUN ls
WORKDIR ./src/app
RUN pwd
RUN ls
WORKDIR ./chut-faut-pas-le-dire/web-ui/src/app
COPY . /usr/share/nginx/html
WORKDIR ./chut-faut-pas-le-dire/web-ui
COPY nginx.default /etc/nginx/conf.d/default.conf
EXPOSE 80

#RUN mkdir /home/sampleTest && cd /home/sampleTest && git clone https://github.com/groupe-1-mais-on-veut-#diriger-le-monde/chut-faut-pas-le-dire.git


#WORKDIR /home/sampleTest/chut-faut-pas-le-dire/services/test_film/

#ENTRYPOINT ["node", "index.js"]
