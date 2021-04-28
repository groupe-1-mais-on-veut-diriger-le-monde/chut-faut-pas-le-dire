FROM node:7

RUN git clone https://github.com/groupe-1-mais-on-veut-diriger-le-monde/chut-faut-pas-le-dire.git

COPY ../services/test_film /serviceFilm

WORKDIR chut-faut-pas-le-dire/services/test_film



ADD /chut-faut-pas-le-dire/services/test_film/app.js /app.js
ENTRYPOINT ["node", "app.js"]