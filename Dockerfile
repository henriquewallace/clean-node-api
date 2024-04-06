FROM node:18
WORKDIR /api/src/clean-node-api
COPY ./package.json .
RUN npm install --omit=dev
