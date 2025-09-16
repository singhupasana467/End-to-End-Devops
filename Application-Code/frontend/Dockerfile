FROM node:18-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["npx", "serve", "-s", "build", "-l", "3000"]
