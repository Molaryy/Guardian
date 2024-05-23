FROM node:18
WORKDIR /front-guardian
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 5173
CMD ["yarn", "dev"]
