FROM node:14-alpine

WORKDIR /app

COPY package.json .

ENV REACT_APP_API_URL=http://44.223.13.208:8080

RUN npm install
RUN npm install axios
RUN npm install @stomp/stompjs --save
RUN npm install sockjs-client --save
RUN npm install amazon-cognito-identity-js

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
