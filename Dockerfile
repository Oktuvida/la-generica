FROM node:current-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --silent

EXPOSE 8080

COPY --chown=node:node . .

USER node

CMD npm run webpack & npm run dev