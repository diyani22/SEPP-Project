FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
RUN npm install -g expo-cli
CMD ["npm", "run", "start"]
