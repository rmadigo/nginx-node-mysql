FROM node:22

WORKDIR /usr/src/app

COPY ./app/package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]