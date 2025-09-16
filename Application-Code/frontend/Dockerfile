FROM node:18.16.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Inject env and build
COPY . .
RUN npm run build

# Serve static files
RUN npm install -g serve
CMD ["serve", "-s", "build"]

EXPOSE 3000
