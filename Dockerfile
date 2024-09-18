FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
RUN npm install -g ts-node
COPY . .
EXPOSE 3000
RUN npm run build
CMD ["ts-node", "api/server.ts"]