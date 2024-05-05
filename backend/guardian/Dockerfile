FROM node:18
WORKDIR /guardian
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE $GUARDIAN_BACK_PORT
CMD ["yarn", "start:dev"]
