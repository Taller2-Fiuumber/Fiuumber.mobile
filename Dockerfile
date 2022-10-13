
# syntax=docker/dockerfile:1

FROM node:18-alpine3.15

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN apk update && apk add bash
RUN apk add curl

EXPOSE 19006 19001 19002

# install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest

RUN npm install
