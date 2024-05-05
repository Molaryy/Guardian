FROM node:20.9.0-alpine
WORKDIR /guardian
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE $GUARDIAN_BACK_PORT
CMD ["yarn", "start:dev"]
