FROM node:14

COPY . .

RUN npm i

EXPOSE 8888

CMD [ "npm", "run", "build:deploy" ]
