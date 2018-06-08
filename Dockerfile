FROM node:10.2.1-alpine

COPY . /app/

WORKDIR /app/
RUN npm install

ENTRYPOINT npm start
EXPOSE 8080