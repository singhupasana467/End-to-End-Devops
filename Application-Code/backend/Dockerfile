# Stage 1: Build stage (full Node with dev dependencies)
FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: Production stage (distroless Node.js)
FROM gcr.io/distroless/nodejs:18

WORKDIR /usr/src/app

# Copy only production node_modules from builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy app source code
COPY --from=builder /usr/src/app .

# Use distroless CMD syntax: entrypoint + arguments
CMD ["index.js"]
