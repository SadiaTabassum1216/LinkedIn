FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 8003
CMD ["nodemon", "index.js"]
