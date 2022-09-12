FROM node:16-alpine as development

WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json ./
COPY nest-cli*.json ./

RUN npm ci --save --legacy-peer-deps

COPY src/ src/

RUN npm run build