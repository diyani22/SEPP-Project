FROM node:18
WORKDIR /app
COPY package*.json ./
RUN nom install
COPY . .
EXPOSE 8081
RUN pm install -g expo-cli
CMD ["npm", "run", "start"]