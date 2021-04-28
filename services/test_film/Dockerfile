FROM node:7



RUN mkdir /home/sampleTest && cd /home/sampleTest && git clone https://github.com/groupe-1-mais-on-veut-diriger-le-monde/chut-faut-pas-le-dire.git


WORKDIR /home/sampleTest/chut-faut-pas-le-dire/services/test_film/

ENTRYPOINT ["node", "app.js"]