FROM node:18.12.1-alpine3.16

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn global add nodemon

RUN yarn install

COPY . .

CMD yarn run dev --bind 0.0.0.0:$PORT

