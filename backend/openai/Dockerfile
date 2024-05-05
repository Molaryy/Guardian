FROM node:18
WORKDIR /openai
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 5000
CMD ["node", "ai_generator.js"]
