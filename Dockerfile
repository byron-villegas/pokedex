# Stage 1
# Node image for npm dependencies
FROM node:16-alpine AS build

# Create workdir
WORKDIR /app

# Copy package.json to app folder
COPY package.json /app

# Run npm install to install dependencies
RUN npm install --silent

# Copy all files to app folder
COPY . /app

# Generate angular build prod for deployment
RUN npm run build

# Stage 2
# Nginx for server deployment
FROM nginx:1.17.1-alpine

# Copy index.html folder to apps nginx folder
COPY --from=build /app/dist/index.html /usr/share/nginx/html

# Copy dist folder to angular app nginx folder
COPY --from=build /app/dist /usr/share/nginx/html/angular

# Replace nginx default config to personalized config
COPY nginx.conf nginx.conf /etc/nginx/

# Expose port outside container
EXPOSE 4200