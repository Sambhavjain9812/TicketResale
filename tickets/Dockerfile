FROM node:16.5.0-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . .

CMD ["npm", "start"]

