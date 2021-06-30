FROM node:14-alpine

ENV TZ="America/Sao_Paulo"

WORKDIR /app
COPY package*.json ./
RUN npm install --production

COPY . .

RUN mkdir ./log

CMD node ws.js | tee log/dixit-ws.log
