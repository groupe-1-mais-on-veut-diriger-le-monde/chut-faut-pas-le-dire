FROM node:7

RUN git clone https://github.com/groupe-1-mais-on-veut-diriger-le-monde/chut-faut-pas-le-dire.git

WORKDIR /services/test_film

ADD app.js /app.js
ENTRYPOINT ["node", "app.js"]