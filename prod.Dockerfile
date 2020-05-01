FROM node:12

RUN yarn global add gatsby-cli

RUN mkdir /app
WORKDIR /app

COPY ./package.json .
RUN yarn install
RUN yarn build

COPY . .
CMD ["yarn", "serve", "-H", "0.0.0.0" ]
