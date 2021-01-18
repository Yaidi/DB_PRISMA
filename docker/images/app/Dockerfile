# if updating node version also update 'engines' in package.json
FROM node:14.15.4-alpine3.12

WORKDIR /home/node

COPY package*.json ./
RUN npm install --production

COPY . .

ENTRYPOINT ["bin/entrypoint"]

CMD ["npm", "start"]
