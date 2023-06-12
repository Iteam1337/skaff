FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g expo-cli
RUN npm install -g ts-node
RUN npm install @types/react@17.0.21
COPY . .
EXPOSE 3000
EXPOSE 80
CMD ["expo", "start", "-p", "80"]
