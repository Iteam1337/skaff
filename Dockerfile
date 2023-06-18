FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
RUN npm install -g ts-node
COPY . .
EXPOSE 3000
CMD ["npm run start:api"]