FROM node:carbon

MAINTAINER Daniel Ramirez

WORKDIR /home

COPY package.json .

RUN npm install
RUN npm install -g nodemon

COPY . .

CMD ["nodemon", "server.js"]
