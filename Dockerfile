FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g expo-cli
RUN npm install @types/react@17.0.21
COPY . .
EXPOSE 19000
CMD ["expo", "start"]
