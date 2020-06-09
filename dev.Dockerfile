FROM node:12

RUN yarn global add gatsby-cli

RUN mkdir /app
WORKDIR /app

COPY ./package.json .
RUN yarn install --no-lockfile
RUN yarn clean

COPY . .
CMD ["yarn", "develop", "-H", "0.0.0.0" ]
