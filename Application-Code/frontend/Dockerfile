# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine

WORKDIR /usr/src/app

# Install serve globally (only production)
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /usr/src/app/build ./build

# Expose port
EXPOSE 3000

# Run the server using serve
CMD ["serve", "-s", "build"]
