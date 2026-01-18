# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

# Remove default Nginx page
RUN rm -rf ./*

# Copy built assets from builder stage
COPY --from=builder /usr/src/app/build .

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# When the container starts, replace the placeholder with the actual API URL
CMD ["/bin/sh", "-c", "sed -i 's,VITE_API_URL,'\"$VITE_API_URL\"',g' /usr/share/nginx/html/index.html && nginx -g 'daemon off;'"]
