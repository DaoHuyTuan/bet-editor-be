FROM node:16

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN yarn install

# Bundle app source

COPY . .

RUN yarn build 

EXPOSE 3000

CMD ["yarn", "serve"]