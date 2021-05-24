FROM node:14-alpine

ENV TZ="America/Sao_Paulo"

WORKDIR /app
COPY package*.json ./
RUN npm install --production

COPY . .

CMD node ws.js
