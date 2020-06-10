FROM node:12

RUN npm install -g gatsby-cli

RUN mkdir /app
WORKDIR /app

COPY ./package.json .

RUN /bin/sh -c 'npm install; npm run clean'

COPY . .

CMD ["gatsby", "develop", "-H", "0.0.0.0" ]
