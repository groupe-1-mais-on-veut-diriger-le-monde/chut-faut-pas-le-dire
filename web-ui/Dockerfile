#FROM node:7
FROM nginx:1.19-alpine
CMD ["pwd"]
WORKDIR ./chut-faut-pas-le-dire/web-ui
COPY ./src/app /usr/share/nginx/html

COPY nginx.default /etc/nginx/conf.d/default.conf
EXPOSE 80

#RUN mkdir /home/sampleTest && cd /home/sampleTest && git clone https://github.com/groupe-1-mais-on-veut-#diriger-le-monde/chut-faut-pas-le-dire.git


#WORKDIR /home/sampleTest/chut-faut-pas-le-dire/services/test_film/

#ENTRYPOINT ["node", "index.js"]
