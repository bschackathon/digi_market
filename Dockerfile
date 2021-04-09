FROM node:10.16.3
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install --production

RUN cd /app

COPY . .

EXPOSE 4000

CMD [ "node", "server.js" ]