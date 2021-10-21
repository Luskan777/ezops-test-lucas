FROM node:14-alpine

LABEL MAINTAINER="Lucas Nunes da Silva"

WORKDIR /home/node

RUN   npm install -g npm@latest 

COPY .  /home/node/

EXPOSE 3000

ENTRYPOINT [ "npm" ]
CMD [ "start" ]


