FROM node:14.15.4
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production
cd node_modules/scrypt-for-humans/node_modules/scrypt
node-gyp configure build

RUN cd /app

COPY . .

CMD [ "node", "server.js" ]