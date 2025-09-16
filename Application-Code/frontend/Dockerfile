# Stage 1: Build stage - full Node.js with npm
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies (including 'serve')
RUN npm install

# Copy all source files
COPY . .

# Build your app (adjust if your build script is different)
RUN npm run build

# Stage 2: Production stage - distroless Node.js runtime
FROM gcr.io/distroless/nodejs:18

WORKDIR /usr/src/app

# Copy only the built static files from builder stage
COPY --from=builder /usr/src/app/build ./build

# Copy node_modules including serve binary
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expose port (adjust to your app's port)
EXPOSE 3000

# Start serving your static files using serve from node_modules/.bin
CMD ["node_modules/.bin/serve", "-s", "build", "-l", "3000"]
