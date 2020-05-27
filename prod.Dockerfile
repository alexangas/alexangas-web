FROM node:12

RUN npm install -g gatsby-cli

RUN mkdir /app
WORKDIR /app

COPY ./package.json .
RUN npm install
RUN npm run build

COPY . .
CMD ["npm", "run", "serve" ]
