FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install axios
RUN npm install @stomp/stompjs --save
RUN npm install sockjs-client --save

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
