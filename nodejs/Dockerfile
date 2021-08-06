FROM node:16
WORKDIR /nodeapi
COPY package.json /nodeapi/package.json
RUN npm install
COPY src/ /nodeapi/src
CMD ["node", "src/server.js"]
