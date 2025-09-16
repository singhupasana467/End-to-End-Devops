# Stage 1: Build stage
FROM node:18.16.0-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Install serve binary globally
RUN npm install -g serve

# Stage 2: Production stage - distroless
FROM gcr.io/distroless/nodejs:18

WORKDIR /app

# Copy build directory and serve binary from builder stage
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/local/bin/serve /usr/local/bin/serve

# Expose port 3000
EXPOSE 3000

# Use serve to serve static files from build folder
CMD ["serve", "-s", "build"]
